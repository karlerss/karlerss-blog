---
title: Zero Bug Tolerance
date: "2021-02-24T12:00:00.000Z"
image: "./bug-tolerance.jpg"
---

Paavo contacted me about starting RecruitLab (we called it _bestrecruitment_ then) when his [employer branding agency](http://brandem.ee/) could not find a suitable applicant tracking system. They signed with Bullhorn initially but found some promised key features missing.

Within ~2 months we launched our MVP and signed our first client - the agency.

When entering an established (enterprise) software niche, "do one thing well" does not work. You have to do a thing well, but you also have to do a lot of other things good enough - the essentials. In the ATS space, for example, the essentials are applicant management, e-mail messaging, job board integrations, tools for GDPR compliance. Without those features, your software is just not that useful.

We spent the first 6 months pumping out these essential features - at a fast pace. As soon as one was deemed acceptable we moved on to the next one.

In retrospect, maybe the strategy to reach approximate feature parity real fast was not the optimal one. Maybe, if we had just cerebrated hard enough, we could have found some product-market fit with one of our [unique features](https://get.recruitlab.co.uk/p/job-builder) as a standalone product.

Bugs don't happen when your SaaS is making $$$ while you sleep. Bugs happen when you change or build features. When you build many features, you get many bugs. During our 6-month building-spree, we started having discussions about our software quality. Not on an abstract level, but in the concrete "some clients are afraid to use some features" sense. Very bad, an existential threat.

We slowed down, held meetings and reflected. Our policy of zero tolerance for bugs was born and we wholeheartedly committed to it.

This does not mean that I stopped building buggy software or Paavo & Marie started catching all bugs in staging. It is a culture of empathy towards our users. We try harder - we test more (both manually and automated). I put more emphasis on non-happy paths, handling faults. Bugs still slip through though, but we do our best to document and understand them, create tickets. When planning development, fixing bugs is always our top priority. We don't build new features before old ones are bug-free (to our knowledge).

The culture shift from yee-haw development to a more careful mode has paid off well for [RecruitLab](https://recruitlab.co.uk/). There are fewer fires to put out. The more diligent testing and development might even be a net time-saver due to fewer distractions from incidents and customer support.