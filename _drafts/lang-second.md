---
layout: post
title: Klack - Log 2
categories: [Language, Klack]
---

X min read

Hello again. This post is going to cover the changes and development of the second version of my programming language - Klack v0.2 (although my adherence to versions was admittedly not the strictest back then), where I added support for what I called "values" instead of "variables" for some reason.

You may notice that my tone will be slightly sarcastic throughout this post. That's largely because I made some silly decisions with the language that I've since rescinded and re-designed. Despite this, it still helped me write a lot of the code that would support variables and assignment going forward, as well as continue to hone in on how I wanted the language to feel to use, so it was still a worthwhile experience.

Without further ado, let's get into it!

## Overall language design
To set the context for why I designed things the way I did, at this point in the language's development, I wanted everything to operate without the need for a function, knowing that functions would be added later. Effectively, the entire program was itself a "main" function and everything would operate within that.

Additionally, in an effort to make the code as readable as possible, I wanted to:<br>
1. Separate statements (code which *does* stuff) from expressions (code which *calculates a value*)
2. Have statements begin with their own designated keyword for clarity

You can kind of see this with the initial version of the language, where `exit` was its own keyword designating an "exit statement", and the exit statement required an expression representing the value with which the program should exit.

Although many decisions I made around this time were questionable, I have stuck by these original design goals to this day and stand by my reasoning for them.
> They do, in fact, seem to make the code easier to read.

## "Value" design
Given these design goals, it felt natural that assigning a value to a "value" (I hope you can see the stupidity of this naming convention by now) would also be done with its own statement and keyword -- namely the `set` keyword, which would be followed by a "value" name, an assignment operator (one of `=`, `+=`, etc.) and then the expression value to use for the assignment. This has remained the same, even to this day.

As for declaring and initializing a "value", however, I came up with the brilliant idea of starting each of those lines beginning with its "Value Declaration Type". What is a "Value Declaration Type" you might be wondering? I'm not sure I even know to be honest, but here's my best recollection:
A "Value Declaration Type" can be one of `const`, `var`, `ref` or `ptr`, where the first two represent immutable and mutable values respectively, and the latter two represent immutable and mutable pointer values.
