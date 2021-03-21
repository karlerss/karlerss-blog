---
title: Software Second Version Richer in Allusion
date: "2021-03-10T12:00:00.000Z"
image: "./second-version.jpg"
---

_Pierre Menard, Author of the Quixote_ is a short story by Argentine writer Jorge Luis Borges. It is a fictional review of a novel that is identical to Cervantes' 1605 _Don Quixote_. Line-for-line, except written in the 20th century and by Mr Menard. The reviewer considers Menard's Quixote to be much richer in allusion than Miguel de Cervantes' "original" work because Menard's must be considered in light of world events since 1602.

But this is a blog about building software products. While rewriting fiction sounds exotic, rewriting software is the most natural thing. We should compare them anyway.

When you first build a feature, you build it precisely like that because you have a hunch <small>(or you copy it from a competitor)</small>. If you build the same thing again (rewrite), it is "much richer in allusion" because it must be considered in light of product events since the first version. Some things must have worked, some things not. Some, your users did not care about. Adding that button the first time is practising a UI best practice, adding it the second time to the same place, tells a story of it being useful the first time. Or it might tell a story of users not reacting to it or you being unable to collect those reactions but being certain of yourself nonetheless.

At RecruitLab, we are rebuilding our [job ad landing page tool](https://recruitlab.co.uk/attractive-job-adverts/) for the third time - changing the data model, but keeping the interface pretty much the same for now. But I really feel that it tells a different story (to us) this time. The parts we are keeping, tell the story of our hunches being correct. And the data model we are discarding - guess we were wrong about that.

On a personal level, building the same thing twice gives me enormous satisfaction. When rewriting a familiar piece of software, all the gotchas and pitfalls seem like high school classmates in the grocery store who I notice from 7 aisles away and avoid like a pro. The sum of all user interactions with the first version gives meaning and weight to the implementation of the second version.

The "same thing" might not even be with the same function, but a product idiom. For example, an entity list with checkboxes and a menu to do an action on the selected entities is a product idiom. Since the entities and actions are usually variable, you can not just copy-paste everything. Also, you might find some things wrong with your previous implementation so you know to avoid those mistakes. With enough practice, you might be able to condense some of it into reusable functions, components or a library.