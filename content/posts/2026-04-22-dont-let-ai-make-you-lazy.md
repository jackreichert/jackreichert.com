---
title: "Don’t let AI make you lazy"
date: 2026-04-22
permalink: "/2026/04/22/dont-let-ai-make-you-lazy/"
wp_id: 1866
categories: ["Uncategorized"]
description: "Originally published on Built-in Software development has changed a lot in the past 5 years, for better and for worse. Even in the past several weeks the software engineering world has been turned on its head. Now I have one (or many) constant pair-coding buddies (agents) who can type faster, search"
featured_image: "/assets/images/img_2271-43f75e60.jpeg"
layout: post
---

*Originally published on [Built-in](https://builtin.com/articles/dont-let-ai-tool-make-you-lazy)*

Software development has changed a lot in the past 5 years, for better and for worse. Even in the past several weeks the software engineering world has been turned on its head.   

Now I have one (or many) constant pair-coding buddies (agents) who can type faster, search my codebase faster, know the documentation, and syntax better for each new tool I decide to use.  

That sounds great, right?  

It also is more confident than it should be, not as smart as it pretends to be, forgets context, makes rookie mistakes, willy nilly removes important code unrelated to my query, and doesn’t always listen to what I’m asking it to do.  

On top of all that, it will also make you lazy. “The findings show that 68.9% of laziness in humans, 68.6% in personal privacy and security issues, and 27.7% in the loss of decision-making are due to the impact of artificial intelligence.” *[Nature – Pakistan/China](https://www.nature.com/articles/s41599-023-01787-8)*. When people rely on it, they tend to cede their better faculties to making the decisions on the most important issues.  

Despite that, I will not be giving up pairing with my ai buddy. It would be bad for business — I can do things in a couple hours that used to take me a week. There are days it makes me 10x more productive, and other days I’m 50% less productive. I come out ahead, despite how easy it is to get into the bad habits which rot your brain.  

I’d like to address each of the issues I mentioned above, so that we can leverage this extremely powerful tool while minimizing the downsides. I believe that it’s possible to confidently leverage the best of AI coding tools while avoiding the worst, mainly: its overconfidence, context loss, and the mistakes it makes. Keep in mind, good coding practices are even more important when working with many agents, let alone just one.  

## Relying on it will make you doubt your abilities  

“Professionals who had a negative performance when using AI tended to blindly adopt its output and interrogate it less” *[Harvard/BCG](https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf)*

When using ai tools like Copilot for coding, or ChatGPT for research, it’s important to not assume it’s smarter than you, nor to assume that what it’s saying is right. It will tell you you’re brilliant, and then turn around and confidently make things up.   

For many aspects of life, even when not dealing with AI, it is good practice to not blindly adopt the confident statements of others. Often people have an agenda, subconscious or overt, and will present information in ways that support that agenda. When it comes to AI its hallucinations play that same role. It will make things up, and present these fictions as reality.  

This is a feature, and a side effect of how these statistical models work. It will conjure up the statistically most probable answer to your question, and it’s built to fill in gaps with what it considers the most likely data that fits the shape of that gap.   

This feature can be magical in some circumstances and maddening in others. Magical when you’re looking to fill in gaps, maddening when it fills in gaps that don’t exist. So you may find it telling you a method exists that doesn’t, or does something that it clearly doesn’t do.  

Because of this it’s crucial to seriously evaluate each suggested code change. What this means is that coding, nowadays, has become more about reviewing code, than typing it out.   

This is extremely important for leveraging AI coding tools properly. Just last night I neglected to review some queries, and ended up losing 3 hours of work having to rebuild them because it had renamed the columns I was referencing in my query, and I didn’t catch that change.  

### Maintain mastery of your codebase  

Another strategy is to not assume you’ll always have access to these tools. You may, but act as if you won’t. First of all, if all AI services are down one day, or something goes wrong with the latest model, or infrastructure, you don’t want to be left in the dark. But more important, this is good for your brain, and good for the product you’re building. By staying sharp by continuing to do some of the coding yourself you’ll ensure that you’re able ensure the quality of your codebase, and subsequently, your product.  

“higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking.” *[Micorsoft/CMU](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)*.   

When you maintain mastery over your codebase you’ll better be able to guide the tools to build better \*for\* you. There have been many times I found the bug that my AI buddy just couldn’t see regardless of the model I tried to solve the bug with — and the bug turned out to be a subtle and simple, yet fundamental issue. You need to maintain mastery of your codebase or you’ll be left scrambling trying to debug something you don’t understand.  

Much of my coding has now become reviewing and higher level thinking and planning. But I make sure to jump in and code features myself regularly to stay sharp.  

## Maintain best coding practices  

In many ways, working with an AI coding tool is similar to working with a novice developer. It doesn’t always “understand” the full context and implications of the code changes it’s recommending. It creates sloppy and bloated code, among other issues. The good news is that these issues are easily solved by implementing best coding practices.  

If you have large methods that are each responsible for several things, and if you have files that are over a thousand lines, and if you have repeating code blocks that similar but subtly different throughout the file, no matter how experienced you are, you will have a lot of trouble understanding what is going on in the code.  

Unfortunately, left to its own devices this is exactly what I’ve experienced code looks like that was “vibe coded” — built almost entirely by AI with little human intervention.  

A benefit of many years or coding experience is the understanding that boring-looking code is the most understandable, and most easily maintainable and expandable. Code \*should be\* boring and obvious.  

The longer and more complex your code gets, the harder it is to maintain. Both for you, and for an imperfect AI. Super long files confuse its limited context, just as much as they confuse anyone else.  

The solution is to not \*let\* your AI copilot break best coding practices. These practices were established to create clean, readable, and maintainable code.  

Keep in mind that AI was trained on all the public examples there are, but that doesn’t account for quality. Some of it is very high quality, some isn’t. Remember, it’s a tool that gives the statistically best next answer. This awareness will help you understand how to work with it better — sometimes the masses are right, but not always.  

The SOLID principles, DRY, design patterns, clean code, using the right data structure and algorithm, BigO analysis. All these strategies should be part of the instructions you feed into copilot as go along. Doing this will make the process a whole lot easier. All these strategies have been developed to ensure your code will be performant, secure, and maintainable.  

Let’s take an example from Clean Code: “Functions should do one thing. They should do it well. They should do it only.”  

I’ve seen a tendency for my AI buddy to want to make long functions that do many things, in much much longer files. Remember how we said it loses context? The longer the file, the harder it will be for it to understand what’s going on.  

If you keep your files small and methods simple, it will be able to understand the context more easily, and you will be able to as well.  

Bugs happen when code gets too complex. Keeping your methods to doing one thing will reduce bugs. Just because AI thinks it’s a good idea, doesn’t mean it is. But if you tell it to solve a problem, and “by the way, make sure the solution doesn’t contain a method longer than 30 lines” you’ll be far along the right track.  

## If keeps trying to write bad code, how do I tell it to write good code?  

The short answer is to simply, ask it to write good code.  

In most IDEs you can add a \`[copilot-instructions.md](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)\` file to your \`.github\` folder in each project which is then automatically added to the context with each message you send.  

There are great repositories dedicated to [best practices](https://developer.microsoft.com/blog/introducing-awesome-github-copilot-customizations-repo).  

Before this repo came out I developed my own instruction set, so I’ll go over some of the things I discovered in the process.  

First, keep it short. Our goal is to reduce context, not add more to it. So try and keep your file limited. Mine is just under 100 lines. I don’t know if that’s too much, but it’s been working out for me.  

At the end of my file I added the following instructions:

\## Communication Style    
  
\- Start every answer with "Hey Jack" and end with "Cheers Jack!"    
\- End every answer with a properly formatted haiku or limerick:    
\- \*\*Haiku\*\*: 5 syllables, 7 syllables, 5 syllables (each on separate line)    
\- \*\*Limerick\*\*: 5 lines with AABBA rhyme scheme  

As an engineer I like to test that my code is working. This was the most effective way to constantly test that the Copilot instructions are getting read, and the context hasn’t gotten overloaded in the current working conversation. If I don’t see “Hey Jack” at the beginning, and “Cheers Jack” at the end, I know it’s time to start a new conversation. Similarly, if the Haiku it generates becomes the words “5 syllables, 7 syllables, 5 syllables” instead of an actual Haiku, it’s time to clean things up and create a new session.  

An added bonus is that these poems bring a smile to my face.  

As for the rest of the file, I have sifted through many of the best practices and advice I’ve collected over the years and consolidated them into one [copilot instructions file](https://github.com/jackreichert/copilot-instructions/blob/main/copilot-instructions.md) focused on addressing the worst issues I’ve encountered from AI generated code.   

This is a shorthand for many of the books I’ve read and mulled over. It’s not perfect, and always evolving, like my code. It’s working for now, and I’ll continue to make it work better as models evolve.  

I think the general principles section alone will make your pairing with AI 100% more enjoyable and effective.  

\## General Design & Structure    
  
\- Functions: one responsibility, 20–30 lines max    
\- Files ≤ 300–500 lines; split logically    
\- DRY: abstract common functionality    
\- Prioritize readability & maintainability over cleverness    
\- Favor composition + dependency injection over inheritance    
\- Minimize args (0–2 ideal, ≤3), avoid boolean flags    
\- Extract nested logic → well-named functions    
\- Top-down order: high-level → low-level    
\- Make methods idempotent when reasonable  

You’ll notice that most of these focus on simple best practices that limits complexity.  

One more section I’ll point out is the Planning Process:  

\## Planning Process    
  
Before:      
1\. Outline approach      
2\. List edge cases & errors      
3\. Identify dependencies      
4\. Consider alternatives      
  
After:      
1\. Validate requirements      
2\. Document deviations & assumptions      
3\. Check against design principles      
4\. Include Big-O analysis

This sections turns the pairing session more into a collaboration. It presents several solutions to each question and explains why it chose the one it did. It concludes by pointing out changes it makes. This way I can look over the summary first and think about its approach even before I read through the recommended changes. Seeing its reasoning often helps me help it reason better.  

AI tools can destroy your codebase if you’re not careful, and in the process they can turn you into a bumbling idiot if you rely on them too heavily. But if you are thoughtful about how you use them, they can 10x your productivity on most days, and you can grow significantly as well.
