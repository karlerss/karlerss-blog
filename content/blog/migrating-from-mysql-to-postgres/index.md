---
title: Migrating Teamdash from MySQL to PostgreSQL
date: "2023-09-28T12:46:37.121Z"
---

Switching your application’s database engine is a once-per-project (maybe even once-in-a-lifetime)
job. It’s easy to feel overwhelmed when starting and easy to make mistakes when planning. I’m sharing
this account to help you navigate the maze of tradeoffs.

## Situation & why

Teamdash is the most [customizable recruitment software](https://www.teamdash.com) on the market. On the technical 
side it’s a multi-tenant app with each tenant’s data in a separate logical database. 
The database schemas are identical for each tenant. Each tenant uses their credentials 
to connect to their database. The application-side database access is through our ORM, 
which supports different database grammars.

The main reason we couldn’t continue with MySQL, was the **lack of vector search support** 
on Amazon RDS. Our users need to find the most relevant people from their talent pool. 
Talent search is a domain where LLM text embeddings-based search can shine. We’d also 
need to combine this with traditional filtering.

An alternative to switching databases would have been to use a second database next to
the main one and sync the relevant data into that. I tried out Weaviate, and it was okay,
but I didn’t see myself building the whole search functionality onto that. The SQL part
was lousy, and merging result sets in the application layer would be a pain and would not scale.
Using multiple databases also adds an operational burden and the overhead of keeping the 
two databases in sync.

### My other grievances with MySQL

> [Index Merge is not applicable to full-text indexes](https://dev.mysql.com/doc/refman/8.0/en/index-merge-optimization.html).

So when you're doing a full text search and join together, MySQL has to do a full table scan for the join.
If your tables are big enough, the queries get unreasonably slow. With 5k x 5k rows the search queries
started taking over 1 second. We had replaced the full text search with like %% queries as a workaround.

A few other things I'm not going to miss about MySQL: doing intricate date math when you just need `date_trunc`;
weird json access syntax (see `col->"$.mascot"` and `json_unquote(json_extract(...`)

## Planning

I had never used Postgres in a "high-stakes" production setting, so I did my best to map
out the challenges ahead. 

I was also lucky enough to underestimate the amount of work it would actually take
when I spun up a postgres container, pointed our app there, and it seemed to just work after
an hour of fiddling.

### Schema per tenant or database per tenant?

As MySQL doesn't have schemas, we had one database per tenant. Not so easy
with Postgres.

I googled hard here. As we'd be using RDS, I took amazon's advice:

> Its recommended to **use one database per tenant** instead of one schema per tenant. Compared 
> with databases, schemas are logical constructs in PostgreSQL and do not separate out data 
> on disk. Schemas also store files on a disk within the same directory in a database — in 
> extreme cases, a system with many tenants can hit certain system limits, such as inode 
> exhaustion.
> 
> – [AWS Database blog](https://aws.amazon.com/blogs/database/choose-the-right-postgresql-data-access-pattern-for-your-saas-application/)

And got some assurances that it wouldn't completely break down:

> We certainly have customers on both Aurora and RDS Postgres with 10k databases...
> 
> – [AWS forums](https://repost.aws/questions/QUAYY8-W33RgWyS3aSQC-qjQ/aurora-postgresql-recommended-maximum-number-of-databases-for-a-multi-tenant-data-layer)

One of the biggest drawbacks of database per tenant with postgres is the difficulty of multi-database
queries. With MySQL we were able to do simple `SELECT ... FROM database1.table UNION SELECT ... FROM database2.table UNION ...`
queries. This is very useful for administrative tasks. This doesn't work with postgres. You have to
do `dblink(...) UNION dblink(...) UNION ...` instead. This opens a new db connection for each
dblink.

On the other hand, as I'm pretty sure we have to support multiple data localities in the future,
having a dblink-based solution would *just work* even with multiple physical servers.

### To pgbounce or not to pgbounce?

Due to PHP's "Shared nothing architecture", we didn't even share database connections.
The default setup with PHP applications is: request comes in, opens db connection, does 
stuff and closes the connection. 

Managing database connections with postgres needs some attention. The main issue is that
establishing new connections is said to be slow-ish. With my (perhaps flawed) testing, I 
found that establishing a new postgres connection can take ~10ms, but re-using connections
with pgbouncer would take ~1ms.

Another reason to use pgbouncer is connection limits. With postgres, [you can have](https://www.enterprisedb.com/postgres-tutorials/why-you-should-use-connection-pooling-when-setting-maxconnections-postgres)
"a few hundred", "no more than 500" and “definitely no more than 1000” parallel connections.
When you need more than that, you'd use pgbouncer to pool the connections together. With many applications
your connections sit idle while your application is working. Pgbouncer fills the idle gaps
with transactions from other requests.

This only sort-of-works with database per tenant, because pgbouncer maintains one pool per
database-user pair. When we have many tenants using the application in parallel, we still
need tons of database connections. You cannot use one tenant's connection for serving
another tenant's queries.

We still went with pgbouncer, but set lower values for server_idle_timeout and default_pool_size.
This way users still benefit from faster response times on sustained app use and the most popular
tenants use a reasonable amount of connections.

For background workloads such as running periodic scripts for each tenant, we created an 
option to connect to the database directly. Otherwise, we'd initialize a pool for every tenant
we had in a short time.

Another limitation we had to work around: pgbouncer needs the possible database connections
preconfigured in a file. So when creating a new tenant, the config has to be updated. We found a
reasonable, but inelegant way, which I will not put on my permanent record 🙈.

If we run into problems with connection limits, we might need to relax the "every tenant has 
own database account" requirement and move to a schema-per-tenant system. This would allow us
to pool different tenants' connections together.

### New databases must be identical to old ones

Laravel manages database changes with migrations. Each migration is a series of SQL 
statements built by an ORM-like thing. When a new tenant is created, those migrations
are run one by one. It is very unlikely that the migrations would create identical
database structures to the nmig-created database structure.

To ensure identical databases:

1. I ran the migration script on a tenant database
2. [Exported](https://laravel.com/docs/10.x/migrations#squashing-migrations) the postgres schema with pg_dump to a file
3. New databases are now always created from that dump file
4. Only the migrations after the move are run for new tenants

### The downtime

Should you migrate tenant by tenant or all at once?

All at once, if possible. Otherwise, you'd have to run two versions of the codebase
at once. No, thanks.

## Tools

We used [nmig](https://github.com/AnatolyUss/nmig) for moving the data.

And a trusty shell script running in [GNU Screen](https://www.gnu.org/software/screen/) that:

1. took a list of databases, and for each old database:
1. generated a new database and user
1. generated the nmig config
1. ran nmig with that config

## Gotchas etc

### Postgres has real booleans

> operator does not exist: boolean = integer

MySQL doesn't have booleans, but has tinyint(1) instead. Nmig only allows per-type mapping 
(tinyint to smallint). Since our database had other tinyint columns as well, we could
not map tinyint to boolean. So I converted all boolean-ish tinyint columns to booleans after
moving the data.

This caused tons of issues (some of which we detected in prod) in the application and 
front-end layers. For example `$q->where('is_active', 1);` or even front-end using `item.is_active === 1`.

### Cast your ints in application

> invalid input syntax for type integer: "3.2"

MySQL used to do it for us.

### Prepared statements and pgbouncer

> Invalid sql statement name: 7 ERROR:  prepared statement "pdo_stmt_00000008" does not exist

You can't use prepared statements with pgbouncer's *transaction* pooling-mode.
Our ORM (Eloquent) used prepared statements by default, so we had to set
`\PDO::ATTR_EMULATE_PREPARES => true,` on our database connection. This
[doesn't have](https://stackoverflow.com/questions/10113562/pdo-mysql-use-pdoattr-emulate-prepares-or-not) 
any significant performance impact.

### Case sensitivity

Our MySQL database was using the utf8mb4_unicode_ci collation, a very sensible
and convenient default. It can store your utf8 text and `l === L` when doing LIKE
queries.

Postgres is case-sensitive by default. That meant replacing all our LIKE queries
with the case-insensitive cousin ILIKE. This is supposedly slower than LIKE, as
indices can't be used. It's not a major performance hit for us, since most of our
LIKE queries are '%term%' anyway.

There also seems to be an option to use a case-insensitive collation on a per-column basis.

### There's no AUTO_INCREMENT in Postgres, but sequences

> syntax error at or near "FROM" ... SELECT AUTO_INCREMENT FROM  INFORMATION_SCHEMA.TABLES...

should be `select nextval('..._id_seq')`

## Actually doing it

I took the app offline during our maintenance window. Stopped queue processing, nginx, disabled
cron. Deployed the new code with changes and ran the migration script. 

It took ~4 hours for ~200 databases. Fortunately, our customers are concentrated in UTC +1 to +3. 
I should have tuned the performance more, as the database resources seemed underutilized.

The next day wasn't exactly quiet, but not too bad either. We caught a couple of errors with
Sentry & immediately fixed them.

I'll offer a piece of wisdom here: it seems like you're more likely to use exotic
database features in the less critical parts of the app. We caught an error in some configuration
functionality a week later. Don't skimp on QA.

It's often said that Postgres is slower than MySQL. We saw no changes in response
times on average, but saw both increases and reductions of up to 15% for specific endpoints.

## What next?

Armed with postgres and its powerful extensions, we're ready to build amazing
search experiences.

Teamdash is also hiring a [product-minded full-stack engineer](https://jobs.teamdash.com/p/job/I5BwgaKN/full-stack-engineer?utm_source=karlerss_blog&utm_medium=post&utm_campaign=postgres_migration).
We're building software that will make 100 000 recruiters happy.
