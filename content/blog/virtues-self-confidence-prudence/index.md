---
title: Virtues of a Developer — Self-Confidence and Prudence
date: "2021-03-27T12:00:00.000Z"
image: "./virtues-self-confidence-prudence.jpg"
---

As a software developer/product engineer, you can build anything and in infinite possible ways. You must also choose the implementation and details which maximize correctness, reliability, usability, and usefulness. Self-confidence and prudence will help you navigate between the expectation of quality and the lure of infinite possibilities.

In Italo Calvino's 1972 novel _Invisible Cities_, an explorer, Marco Polo, tells his emperor Kublai Khan stories of cities in his vast and expanding empire. In Andria[^1], every street follows a planet's orbit. Jobs and ceremonies correspond to the position of stars on that date. The sky and city reflect each other. Marco Polo assumes that the citizens take care not to change anything in the city plan or their habits, but he is shown a theatre under construction, a port, just inaugurated. The inhabitants tell that every change in the city changes the sky a little. So, "before taking any decision, they calculate the risks and advantages for themselves and the city and all worlds." Polo considers them "self-confident and prudent."

I first read the novel in high school, and the magic of two-way synchronization between very different things stuck with me. I posit that there is the same kind of coupling between products and their users.

Sometimes we build what the user needs - usually by asking users. We lay our streets (product features) according to the stars (users[^2]). Other times we deliver features, and our users change their behavior by using them. This our city changing the stars. In the latter case, you, the developer, are the citizen who must calculate the risks and advantages to your codebase, company, and all users.

The first mode of innovation is essential ("talk/listen to your users"), and the presence of the second is what I consider differentiates the exceptional teams and products.

Building speculative - things your users didn't ask you for - features/products, carries risks. Primarily, your users might not need it or understand that they need it, and you'll have to write off the development effort or go way over your allocated time/budget. Secondarily, there are risks on the technical and execution side - you might break existing users' workflows or create annoying performance issues. Your new thing might be unusable due to bad UX.

> "Weeks of coding can save you hours of planning." - Unknown.

Prudence (contracted from _providentia_, "seeing ahead, sagacity") is the ability to govern and discipline oneself by use of reason. Foresight and caution being the main attributes. When building speculative features, you cannot see the future, but you can map out possible futures, including failures. A prudent execution of a task would fare well in both failure and success. A lack of prudence would assume success where it's unassumable. The "premature optimization is the root of all evil" quote[^3] by D. Knuth illustrates one side of this. Other examples would be taking on a new dependency (and operating it for eternity) when your existing systems could do well enough or overzealously Not Repeating Yourself[^4].

Balance your prudence with self-confidence. You won't need that Elasticsearch/[Hadoop](https://adamdrake.com/command-line-tools-can-be-235x-faster-than-your-hadoop-cluster.html)/Kubernetes cluster until you do. Sometimes, to get a fast and honest signal about your new thing's usefulness, it might make sense to break some users existing workflows. Without self-confidence, you get stuck in ambiguity and analysis-paralysis. Making a decision and committing to it is valuable in itself.

The prudence/confidence balance determines seniority. The best way to practice is by making mistakes in a semi-controlled environment, where consequences are real but not an existential threat.

[^1]: Full chapter [here](/img/italo-calvino-invisible-cities-andria.png).

[^2]: Let me reiterate - our users are our stars.

[^3]: "Programmers waste enormous amounts of time thinking about, or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered. We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%."

[^4]: Don't repeat yourself is a principle of software development aimed at reducing repetition of software patterns, replacing it with abstractions or using data normalization to avoid redundancy. This is generally a good thing, but when applied too early and too often, you'll probably end up with bad abstractions.

