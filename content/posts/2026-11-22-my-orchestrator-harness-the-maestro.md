---
title: "My Orchestrator Harness, The Maestro"
date: 2026-11-22
permalink: "/2026/11/22/my-orchestrator-harness-the-maestro/"
wp_id: 1902
categories: ["Uncategorized"]
post_tags: ["ai", "artificial-intelligence", "chatgpt", "llm", "Technology"]
description: "Software tooling today changes from week to week. The speed that AI is changing things can be disorienting. AI agents can write code quicker than pretty much anyone; it knows the syntax of any and all languages, tools, or frameworks I may want to use, and it can gain mastery over a codebase quicker "
featured_image: "/assets/images/img_1598-7b2b63a4.jpg"
layout: post
---

Software tooling today changes from week to week. The speed that AI is changing things can be disorienting. AI agents can write code quicker than pretty much anyone; it knows the syntax of any and all languages, tools, or frameworks I may want to use, and it can gain mastery over a codebase quicker than anyone.

You can set up a team of a dozen, or 100, agents. Each one will take on a task or feature. Today, every engineer can have a team of engineers working for them.

That speed does come at a cost. While it is easier to build today than ever before, the token usage can get costly.

Jensen Huang suggested that elite engineers, on a $500k salary, should spend $250k annually on token usage, and should be fired if they do not. $750k sounds like a lot to pay an engineer; however, effectively wielded, a team of agents can be a powerful force multiplier for that engineer.

The flip side of that is that it incentivizes wasteful token usage, which leads to tokenmaxxing — spending tokens on things you don’t need to for the sake of hitting metrics. Today, many companies are scaling back their AI budgets.

Engineers are responsible for keeping the cost of their tools down — using Kubernetes for a simple blog is over-engineered and a waste. Similarly, tokenmaxxing is similarly wasteful. Yet not being able to scale out when needed can cost a company too, and not giving engineers the tools to compound their expertise can also be shortsighted.

I wanted to try the agent-swarm hype myself. Being the curious person I am, I built an orchestrator.

It started with small annoyances in Claude Code.

I would ask a question in the middle of a task. The agent stopped the task to answer me. It dropped the work it had been doing.

I wrote a skill for the agent that if I ask a question while you are in the middle of something, it should assume that the question starts with “continue what you are doing, but when you are done, X.”

What IS a skill?

A model is a statistical representation of all the collected knowledge that it was trained on. In these models, there is all the open-source code, all the available books in all available languages. It contains images, poetry, videos, and conversations.

The problem is that a model has so much in it, the paths it can take to find the next answer aren’t always consistent. One way we get around this is with skills. A skill is usually a document you could read and understand, written in plain English, that tells the agents how you want them to think.

You can ask an agent to research a topic to answer a question, or you can say: build a list of books on this topic, then summarize them, then pull out themes across them, then answer this question. The second way is more thorough, and if you tell it to research that way each time, you’ll be more likely to get more consistent and quality answers.

Instead of having to remember to tell it each time how to research, you can write a “research” skill telling it how you’d like it to research. So each time it does research for you, you know how it will be doing the research the way you want it to research.

That is an example of a skill. You can make skills to do just about anything, whether it’s how you look for rest stops while traveling, or how you assess a stock.

Once that follow-up skill was always on, I wanted the agent unblocked. I didn’t want to wait for the agent to finish what it was doing, so I added to the skill: if I ask it to do something that is complex enough that it will take more than 15–30 seconds, it should use a subagent. Boom, I had a slim orchestrator.

The first a-ha! moment was when a colleague said he was working in the top-level directory containing all of his repos. I adopted this practice. Now all my agents could get whatever context they needed when working across repos. In a large, complex system where each product spanned multiple repos, this was critical.

Here is why. A notification starts in the API. A queue sends it to an orchestration platform. That platform queues the message in a third-party messaging tool. If the agent works each repo on its own, it misses that path. If it can search any relevant repo, it finds things I might have missed.

The next issue I ran into was cost. I noticed that my personal daily bill was climbing, as was the rest of the team. I started analyzing every day’s costs. I ran an A/B test each day to evaluate a different cost-saving practice. The biggest cost was the context. As it grows, it gets more expensive.

The fix I reached for was to compact often, or to reset the session. Both throw the context away. I would have to start over. That is why I built memory outside the chat.

First the ledger. Flat files that hold what we did. It is the context, but the good parts. Morgenstern might not approve; my budget did. I wrote those files in Markdown, so I can read them. I also wanted better search, so I indexed the files in a local database, with tags.

I still needed three answers. What did we learn? What are the priorities? What do I need to do next?

Next I created Xenophon, my ticketing skill. It mirrors Jira locally. It also holds potential future stories. It’s easy to get distracted by rabbit holes when developing. By keeping track of issues as they come up, you can easily prioritize tech debt when you have time, but not get distracted from your current task. I modeled it loosely on \[Beads\]([https://github.com/jackreichert/the-maestro/blob/main/library/SKILL.md](https://github.com/jackreichert/the-maestro/blob/main/library/SKILL.md)), but in Markdown, so I can read it.

The library is knowledge I learn while doing the work, about the codebase and the product. I think of it as a personal Confluence. A team should be able to share it. It is where I store plans, tech docs, how a feature works, and institutional knowledge about the codebase. Agents can read it instead of doing the same research again.

The last piece of the durable memory is the podium. It is the current status. It says what is important, what I am working on, which questions are waiting on me, and which pull requests need review.

A rolling chat makes it easy to miss things. Sub-agents report back, and the dialogue scrolls fast. A lot of questions need an answer. Asking it to repeat itself, or asking what is waiting on me, wastes tokens. The podium is a single flat file that holds all of that. It also tells The Maestro what is important to me. It keeps both of us focused.

The ledger, the library, and the podium together are more powerful, and more focused, than a long context window. Once they were in place, I turned on auto-compact. I hooked pre-compact to a roll. A roll is a mini retro. It makes sure everything is set up for the next session. I can also clear the whole session. I still have what I need to pick up where I left off.

The cost tests showed another lever: delegation. Delegation. I should not use Fable to search a codebase. I should not use Sonnet for that either. Fable is only cost-effective for the most complex planning. Opus is a better orchestrator than Sonnet. It adds about 10% to the daily cost over Sonnet. I make that back when it catches issues earlier. Haiku, used properly, is a powerful cheap tool.

I built a retro into The Maestro. It looks through the ledger for items that should move to the library. It looks for tasks Haiku could have done with a playbook and scripts. It surfaces ways we could work better. It proposes changes to the workflow.

One more piece came out of those cost retros. Agents sat and waited on long tasks. A unit test suite. A query. I added an event loop. An agent can register a script, a timer, or a task. It gets an alert when that finishes, or when it is time to check in.

With all of this, I could work on several tasks at once. The ledger kept surfacing the decisions I had to make, and the pull requests were ready for my review. I could run a long context window without a giant bill. I reduced costs by 80%.

One caveat: Most staff-level engineers I know are building their own orchestrator right now. That reflects how we explore tools and how we work. The way I work will differ from the way someone else works. This is my personal assistant. It improved my performance. It let me juggle several projects without dropping the ball. It will not be how another engineer works. I am sharing the process I went through, so it can help other people with the problems they have already hit.

This is my Maestro (from the [Readme](https://github.com/jackreichert/the-maestro))

Maestro is a set of skills for a coding agent that works across repositories. It says what to pick up next, how to split a pull request, and when to hand work to another agent.

It also keeps a written memory outside the chat: decisions, what is in progress, and knowledge worth reusing. A new session reads that instead of replaying the old conversation. Optional hooks save the memory at the end of each turn and again just before the harness compacts the chat. The conversation can then stay short, which costs less, and the next session still knows where you left off.

You add this folder to a harness that loads skills. There is no account and no installer. Memory is Markdown plus a small Node CLI. The hooks are optional. The install steps supplied today are for Claude Code. You can also turn on alerts for selected pull requests, reminders, and finished commands.

[](https://github.com/jackreichert/wikidrift#skills)

<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Skill</th><th>Responsibility</th></tr></thead><tbody><tr><td>Maestro</td><td>Dispatch, continuity, branch flow, PR budgets</td></tr><tr><td>PR preparation</td><td>PR writing, feedback, human-review gates, conflicts, readiness</td></tr><tr><td>Planning</td><td>Project shaping, delivery plans, technical designs</td></tr><tr><td>Mithril</td><td>Coding checks by phase</td></tr><tr><td>Xenophon</td><td>Local tickets and approved Jira publication</td></tr><tr><td>Podium</td><td>Priorities, status, pull requests, questions</td></tr><tr><td>Ledger</td><td>Decisions, outcomes, topic recovery</td></tr><tr><td>Library</td><td>Verified repo knowledge</td></tr><tr><td>Retro</td><td>On-demand review. No schedule</td></tr></tbody></table></figure>

[](https://github.com/jackreichert/wikidrift#muninn)

**Muninn** is Ledger, Library, and Podium. The name covers those three. It is not a fourth store. Commands, settings, and paths stay the same.

-   **Ledger:** what happened and why.
-   **Library:** reusable, verified knowledge.
-   **Podium:** what matters now and what happens next.

Podium is the live board: priorities, active pull requests, open questions, blockers, next actions, and where to resume. Plans and handoffs link there. They do not keep a second status. Questions include context, options, a recommendation, and why. If no recommendation is sound, say which fact is missing and why it matters.

With the hooks on, the agent writes the turn’s decisions and status before the chat is compacted or the session ends. The next session starts from Podium, then opens Ledger or Library only for the task it picked. Without the hooks, the same files still work. The agent writes them when the skill says to. Register the hooks in SETUP. How a save is stored, retried, and checked is in persistence.
