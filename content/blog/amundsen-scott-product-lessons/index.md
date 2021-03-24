---
title: Product Lessons from Scott & Amundsen
date: "2021-03-22T12:00:00.000Z"
image: "./product-lessons.jpg"
---

One of my all-time favorite Wikipedia articles is [Comparison of the Amundsen and Scott expeditions](https://en.wikipedia.org/wiki/Comparison_of_the_Amundsen_and_Scott_expeditions). The wiki article contrasts approaches of two teams conquering the geographic south pole in 1911-1912. Building software products is no arctic expedition, but both entail complex planning and execution in uncertain environments.

Amundsen's team was first to the pole and suffered no casualties. Scott's team perished on their way back, 18 km short of their supply depot. Stakes in software product development are considerably lower. So much lower. A different league. Apples and oranges.

## Keep your focus

In 1909 Amundsen only had one goal - to be the first man on the north pole. After setting sail, he informed his team that Frederick Cook and Robert Peary just conquered the north pole, and they (Amundsen & co) are doing a 180 (in degrees latitude) and going to the south pole.

Scott's expedition, on the other hand, had their attention divided between the pole and various zoologic, geographic, and meteorologic objectives. The weight of scientific equipment and geologic samples (14 kg of rocks), which they had to haul, contributed to their failure.

> The man who chases two rabbits catches neither. <br>
> — Confucius

When planning a software product, you will probably do better with a shorter list of requirements. Solving problems with software is like fighting a hydra. For every sub-problem you crack, you probably discover another two, which you'll be inclined to tackle. At [Recruitlab](https://recruitlab.co.uk/), every time we deploy a new feature, we get internal and external feedback and a deeper understanding of the problem. That materializes as a bundle of tasks/heads, which either take priority or go in our beloved backlog. We have learned to plan for this - when taking on a new feature and giving estimates, we also try to **estimate the amount of probable feedback & ideas**. It is usually a function of our knowledge and confidence. If we planned for building A and then building B, we'd face a hard choice - should we half-ass A to deliver B on time, or should we polish A and postpone B (and possibly break some promises to clients).

## Choose a familiar and appropriate tech stack

Scott's party set for the pole using motorized sleds, dogs, ponies, and walking. The sleds broke down, dogs and ponies died, and man-hauling sucked. Amundsen's party chose dogs and skis. The whole team of Norwegians had skied from an early age. In the arctic, skiing beats walking. The dogs were a self-hauling food - weaker dogs were eaten by the team and fed to other dogs.

> Don't go chasing waterfalls,  <br>
> Please stick to the rivers and the lakes that you're used to  <br>
> — TLC

Choosing React for your product would have been an extremely irresponsible choice in 2014 (released in 2013). Like motorized sleds, the technology would mature in some years, but with your then-knowledge, you couldn't have known. You might have chosen elm or segway. Today, keep clear of svelte, Web Components, preact &c.

Here's a safe list of acceptable software for building a SaaS product in 2021: MySQL, PostgreSQL; Django, Ruby on Rails, Laravel; React, Vue; Nginx, Apache. Only use tools you are familiar with. Deviating from this, unless you have an overwhelmingly good reason, is considered a red flag in my book. Microservices = ponies, Haskell = walking in deep snow.

Even when building a monolith, there's one thing the future you will thank you for - make the application monolith stateless. Use object storage for hosting user-generated content and maybe choose an appropriate cache system.

## Curb your perfectionism

Scott considered sacrificing dogs vile and man-hauling noble. In 1911, to reach the south pole, you had to use dogs, it turns out. If it helps you deliver value to your end-user, an `: any`[^1] here and there is perfectly fine.

## Overprovision

Amundsen's team didn't leave route marking and provision depots to chance. For one distance where Amundsen laid seven depots, Scott laid only two. If you host your SaaS on a single machine and a managed database service, consider a beefier option. It will delay inevitable scaling issues but won't cost much extra.

## Don't overstretch your team

Scott, in his diary, later acknowledged that "skis are the thing" but found that they were late to take corrective action. Even if machine learning turns out to be the thing and suitable in your domain, telling your full-stack guy to sprinkle some AI on it will probably turn out a waste of time or money.

[^1]: Explanation for a (non-technical) reader: we build our frontend using [TypeScript](https://www.typescriptlang.org/). This language makes it easier to avoid some classes of bugs by annotating all data with a [type](https://en.wikipedia.org/wiki/Data_type). Say a piece of data is of type `Person` then you can be sure that it has `name` and `email` fields associated with it. Sometimes this annotating might be really cumbersome and then you just mark it as `any` type. Marking a piece of data to be of `any` type, forfeits the bug-catching advantages of TypeScript, but might save you a bunch of time.