# Table of contents
- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [4.0 Comments](#40-comments)
  - [4.1 Comments do not make up for bad code](#41-comments-do-not-make-up-for-bad-code)
  - [4.2 Explain yourself in code](#42-explain-yourself-in-code)
  - [4.3 Good comments](#43-good-comments)
    - [4.3.1 Legal comments](#431-legal-comments)
    - [4.3.2 Informative comments](#432-informative-comments)

# Introduction
I started reading this book prior to creating this repo hence why there are missing chapters. I'm continuing where I left off and will fill in the gaps eventually.

Code examples are directly taken from the book and translated to TypeScript or JavaScript where applicable.

# 4.0 Comments
> "Don't comment bad code—rewrite it." —Brian W. Kernighan and P.J. Plaugher

* Comments are not "pure good."
* Comments  are to compensate for our failure to express ourself in code.
  * Therefore, **comments are always failures.**
* > "Because they lie. Not always, and not intentionally, but too often." —Robert C. Martin
  * A comment is more likely to be plain wrong when
    * The older a comment is
    * The farther away it is from the code it describes
  * Programmers realistically can't maintain them.
* Inaccurate comments are worse than no comment at all

To follow up previous chapters that are all about making code clear enough that it tells a story as to what the code actually does. When code is self-explanatory there is no need to further explain your code with comments. Comments are temporary because code changes and evolves, thus rendering the comment useless and if not worse: misleading.

It is possible to make a point that programmers should put in a disciplined effort to keep their comments in a high state of repair, relevance and accuracy but that time and energy could be much better spent refactoring the code to not need a comment at all.

> "Truth can only be found in one place: the code. Only the code can truly tell you what it does. It is the only source of truly accurate information. Therefore, though comments are sometimes necessary, we will expend significant energy to minimize them." - Robert C. Martin

## 4.1 Comments do not make up for bad code
A common motivation for writing comments is bad code, when you know it is confusing and disorganized. We know it's a mess. Rather than spend your time writing the comments that explain the mess you've made, spend it cleaning that mess.

## 4.2 Explain yourself in code
There are certainly times where code makes a poor explanation. Don't take that this means that code is seldom, if ever, a good means for explanation. This is false. What would you rather see? This:

```js
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) {
    ...
}
```

Or this?

```js
if (employee.isEligibleForFullBenefits()) {
    ...
}
```

The latter takes only a few seconds of thought to understand. In many cases it's simply a matter of creating a function that says the same things as the comment you want to write.

## 4.3 Good comments
Some comments are necessary or beneficial. Keep in mind that the only truly good comment is the comment you found a way not to write.

### 4.3.1 Legal comments
Copyright and authorship comments are reasonable to put at the start of each source file.

```js
// Copyright (C) 2021 by Murad Buyukasik. All rights reserved.
// Released under the terms of the GNU General Public License version 2 or later.
```

Comments like this should not be contracts or legal tomes. Where possible, refer to a standard license or other external document rather than putting all the terms and conditions into the comment.

### 4.3.2 Informative comments
Sometimes it is useful to provide basic information with a comment. Consider this comment that explains the return value of an abstract method:

```ts
// Returns an instance of the Responder being tested.
protected abstract responderInstance(): Responder;
```

A comment like this can sometimes be useful, but can be made redundant by changing the method's name to `responderBeingTested`.

A better case:

```ts
// format matched kk:mm:ss EEE, MMM dd, yyyy
let timeMatcher: Pattern = Pattern.compile("\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*");
```

In this case the comment lets us know that the regular expression is intended to match a time and date that were formatted using the specified format string. Still, it might have been better, and clearer, if this code had been moved to a special class that converted the formats of dates and times.