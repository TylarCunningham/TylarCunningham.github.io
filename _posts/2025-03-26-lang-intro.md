---
layout: post
title: Klack - Log 0
categories: [Language, Klack]
---

7 min read

Welcome to the first in a hopefully long line of blogs covering the development of my compiled programming language: Klack. This particular post will serve more as an introduction to the origin and philosophy behind the language, without getting too much into the nitty gritty details just yet. Keep an eye out for the more detailed stuff in the future though!

## Inspiration
Similar to most people who seem to be creating a programming language these days, I was mostly motivated to do so out of frustration with existing languages.

From the previous post, you might know that I started my programming journey in Java. Besides very simple Minecraft modding and some very poor attempts at making games though, my Java experience didn't get very far before I found C++ and started trying to make games in that language instead. This language transition was courtesy of The Cherno (then known as TheChernoProject) on YouTube, as well as an obscure website on graphics programming called [rastertek](https://rastertek.com/index.html). At this part in my "programming career", I was mostly just copying tutorials and trying my darndest to understand what was happening, and it worked to a certain extent -- but I didn't understand enough to form my own opinions about what I liked or disliked about certain things when it came to programming.

Come high school, my personal programming was mostly the same as before, but, courtesy of programming classes and participating in the school's robotics team, I now had to use my skills in a more academic and professional environment. This was still only using Java and C++, however I now needed to understand how the languages worked on a much deeper level in order to solve complex and abstract problems set before me. The biggest change for me, however, was working with other people on the same software -- something I hadn't experienced before when it came to programming, and something I haven't had the pleasure of experiencing in quite the same way since. But the die was cast, and I was destined to be a programmer in some way shape or form, and so that's what I went to study in university.

My university experience was a bit of a fever dream courtesy of being interrupted by a global pandemic, but overall it was a great experience and I learned a lot - just not as much about programming as I would have liked. Most of that learning was done in personal projects or during my co-op position at the place I'm working now, which introduced me to the actual distinction between C and C++, something which had previously been muddled courtesy of the combined "C/C++" you see nearly everywhere. Up until now, I had been using C++ in my personal projects, but experimented with using C and immediately fell in love. I found that although it was less expressive than C++, what you read is what you get (or so I naively thought). There was no hidden control flow, no magical constructors and destructors and having to remember when each may or may not happen. No class hierarchies and polymorphism and up and down casts, none of that. There was just data and things which operate on data.

My world view on C was blissfully simple.

I found it much easier to trust that the code I was writing would actually do what I wanted, but as a result, became frustrated with a lot of the overcomplications I saw in other languages, particularly the never-ending trade off of readability and understandability (if those could be quantified in any way) for the ability to express things in marginally more convenient or efficient ways. I also had the pleasure of getting deeper knowledge about how the C language works, its quirks, its limitations... its flaws. Although it was the best language I had used at the time, it was also still not a perfect language by any means, and I started to get frustrated with some of the more "exotic" features such as integer promotion, the large amount of undefined behaviour in the language specification, the vastly different toolsets for compiling and building on different platforms, and even just the inconsistency in the language implementation itself.

C was good enough, but it wasn't everything I needed.

And so, part-way through my university program, I came upon a [blog](https://www.freecodecamp.org/news/the-programming-language-pipeline-91d3f449c919/) which demystified what was going on under the hood of a compiler, and opened my eyes to the interesting world of compilation and language design. It inspired me to one day try my hand at making my own programming language, and so was bookmarked as a future project, with very tiny tidbits of work being done on it -- until the summer of 2020, between semesters at university, when I attempted an implementation in earnest.

### My first attempt
The language was called "novalang", because supernovas are cool and "nova" means "new" in latin, which the language technically was. I started out by creating the grammar I wanted for the language in [Backus-Naur Form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form), which I found to be a fairly intuitive way of expressing how I wanted the language to look and feel -- the shape of the language if you will.

This language was extremely minimal at first. Something akin to `{ <num> }` with the goal of this number being the exit code of the produced program. This extremely complex grammar was the basis for writing arguably the easiest parts of the compiler: the lexer and parser, after which a poor-man's backend was tacked on which would take the resulting "Abstract Syntax Tree" (AST) and output the necessary x86_64 assembly to a file to exit with the specified number.

After running the compiler, another script had to be manually run which would use NASM to assemble the output into an object, and then the linker would be invoked to produce the final binary. Every corner that could be cut was being cut, but I had a mostly working, extremely minimal language (on Linux at least). Cool!

The project was mostly put on hold, until a family vacation to the lovely province of British Columbia where it was a blazing 40+ degrees Celsius during the days, and a toasty 25 degrees at night... with no AC. God only knows what motivated me to add a laptop to the mix, but with some free time to dedicate, I dove into expanding the language's functionality. Basic expressions supporting arithmetic replaced the hard-coded exit code; parsing produced a proper AST instead of just a number; I added an "action tree" under the guidance of the aforementioned blog post; and a poorly implemented three-address code intermediate representation was added which would be translated for the assembly output.

Language features were hacked in over the next few months, with the language being expanded to include variables, if, elif, else and while statements, as well as more complex expressions and boolean logic, support for literal strings and even some preliminary support for floating-point variables and functions.

But as the language grew in complexity and scale, so too did the code which enabled it to function in the first place -- and at an alarming rate. The code was becoming more difficult to read, more difficult to debug, and the flaws in the design of the language (or complete lack thereof) were becoming ever more apparent. It also only worked on Linux and required specialized external tools to be executed in a particular order, which was mildly inconvenient.

And so, like any good software developer, I threw it away and started over.

### Starting over
The following summer, once again between university semesters, another masterpiece of software was born into the world with the commit title:
```c
bool aurum_compiler_instance_init(aurum_compiler_instance_t *const instance);
```
For the astute observers out there, you may notice that this is in fact code, and not something describing what was changed or added. What can I say, I was sloppy in the early days ¯\\_(ツ)_/¯. You may also notice that things are prefixed with "aurum" instead of "klack" -- that was the placeholder name when starting the language before I settled on "klack" (more on that later).

More importantly however, I completely changed my approach to creating a programming language. Instead of starting with some terribly complex idea about how the language could or should work -- effectively a massive fully-fledged grammar -- and trying to implement that language piece by piece, I started with the simplest and most elegant language I could come up with for the simplest program possible, and implemented one language feature at a time through all stages of the compiler after that. Much like before, this was initially just specifying an exit code for the program, but with a numeric expression this time instead of just a number (some have described this as a "glorified calculator").

Once I had the initial language implemented, I started planning the design of the language a few versions ahead of what was being implemented, and have continued to do so since then. It helps inform any technical decisions I have to make while implementing the current language feature (e.g., should I hack this thing in and fix it later, or properly design things for the future now), but also makes implementing the feature itself far easier. Having a checklist of changes or sub-features that you can just check off as you go through them saves from having to context switch between the *design* behind the code you're writing and the *implementation* of the code itself. To paraphrase some random article I read many years ago about how NASA does software development:
> The software is only as good as the plan for the software

Nearly 16 versions and over 3 years worth of work later, and the language is nearing a more generally usable state, with far better syntax, implementation and design than whatever I could have come up with from where I started previously.

### What kind of a name is "Klack" anyways?
Before I was known on the internet as "CunningTea", and in fact, before I went by anything else on the internet, I came up with the glorious name of "Klack321" (Maplestory and Runescape for those wondering). Flash-forward to some point in the future, when talking about my language and its temporary name with a friend whom I've known since my first days online -- He suggested "Klack" as a name, only somewhat jokingly, but after he said it out loud it seemed like the perfect name for what I was creating, and it stuck.

It also happens to be an onomatopoeia for typing on a keyboard, and is similar to the word "hack" (a word occasionally associated with programmers), so it just seemed like the perfect name for a programming language, and certainly more appropriate than "aurum".

And thus, the Klack programming language was born

### And so it began
Although my delve into creating a programming language may have initially spawned from frustration with other languages, and perhaps a bit of curiosity into how a compiler even works in the first place, it has since transformed into more of a personal goal to provide the programming world with a language I think it needs and deserves -- or at least, what I wish I had available to me to learn and use throughout all of my years of programming. Whether I achieve that goal remains to be seen, but there is now a little spec of light visible in the long dark tunnel, and that is truly an incredible feeling.

In terms of the current status of the language, I have about 3 big features left to go to support a MVP of the language/build features. After that, my priorities will shift more towards bug fixing (there is no shortage of bugs at the moment), compiler and output optimizations (but more output -- the compiler is very fast as-is) and output features (dynamic libraries, dynamic linking, better C interoperability, etc.).

As hinted at previously, my hope is to have a mostly stable, releasable version ready in the next ~2 years or so, however the timescale is very flexible at the moment. Between now and then, I'll also have to give further consideration to how I can potentially make a living off of it, so I can dedicate more time and provide higher quality software to the overall ecosystem of development. In the meantime, I suppose I'll have to rely on the generosity of the foolish and the rich (which would be a great name for a band) while I do the work... with a little bit of documenting on the side.

Anyways, take care and catch you in the next post, where I'll be actually begin discussing the technical stuff that got me to where I am today with the language :)
