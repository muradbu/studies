# Table of contents
- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [4.0 Comments](#40-comments)
  - [4.1 Comments do not make up for bad code](#41-comments-do-not-make-up-for-bad-code)
  - [4.2 Explain yourself in code](#42-explain-yourself-in-code)
  - [4.3 Good comments](#43-good-comments)
    - [4.3.1 Legal comments](#431-legal-comments)
    - [4.3.2 Informative comments](#432-informative-comments)
    - [4.3.3 Explanation of intent](#433-explanation-of-intent)
    - [4.3.4 Clarification](#434-clarification)
    - [4.3.5 Warning of consequences](#435-warning-of-consequences)
    - [4.3.6 TODO comments](#436-todo-comments)
    - [4.3.7 Amplification](#437-amplification)
    - [4.3.8 ~~Javadocs~~ Jsdocs in public APIs](#438-javadocs-jsdocs-in-public-apis)
  - [4.4 Bad comments](#44-bad-comments)
    - [4.4.1 Mumbling](#441-mumbling)
    - [4.4.2 Redundant comments](#442-redundant-comments)
    - [4.4.3 Misleading comments](#443-misleading-comments)
    - [4.4.4 Mandated comments](#444-mandated-comments)
    - [4.4.5 Journal comments](#445-journal-comments)
    - [4.4.6 Noise comments](#446-noise-comments)
    - [4.4.7 Scary noise](#447-scary-noise)
    - [4.4.8 Position markers](#448-position-markers)
    - [4.4.9 Closing brace comments](#449-closing-brace-comments)
    - [4.4.10 Attributions and bylines](#4410-attributions-and-bylines)
    - [4.4.11 Commented-out code](#4411-commented-out-code)
    - [4.4.12 HTML comments](#4412-html-comments)
    - [4.4.13 Nonlocal information](#4413-nonlocal-information)

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

### 4.3.3 Explanation of intent
Commenting to explain your intent is fine. For example when you're facing more than one way to achieve your end goal, you may comment why you did it this way.

### 4.3.4 Clarification
Sometimes it is helpful to translate the meaning of some obscure argument or return value into something that's readable. Although it is better to find a way to make that argument or return value clear in it's own right; but when it's part of the standard library, or in code that you cannot alter, then a helpful clarifying comment can be useful.

```js 
assertTrue(a.compareTo(a) == 0); // a == a
assertTrue(a.compareTo(b) != 0); // a != b
assertTrue(a.compareTo(b) == -1); // a < b
```

There is a substantial risk that a clarifying comment is incorrect. Go through the previous example and see how difficult it is to verify that they are correct. So before writing comments like that, make sure that there is no better way, and then take even more care that they are accurate.

### 4.3.5 Warning of consequences
Sometimes it's useful to warn other programmers about certain consequences. Take for example this comment that explains why a particular test case is turned off:

```ts
public static function makeStandardHttpDateFormat(): SimpleDateFormat {
  // SimpleDateFormat is not thread safe, so we need to create each instance independently.
  const df: SimpleDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z");
  df.setTimeZone(TimeZone.getTimeZone("GMT"));
  return df;
}
```
### 4.3.6 TODO comments
A todo comment should explain why the function has a degenerate implementation and what the function's future should be.

```ts
/* 
* TODO setting result is not needed
* The function should return a + b only
*/
function getSum(a, b): number {
  const result = a + b;
  return result
}
```

`TODO`s are jobs that the programmer thinks should be done, but for some reason can't do at the moment. It might be a reminder or a plea for someone else to look at the problem. Nowadays through extensions you can organize `TODO`s in a single place in your project. Still, don't litter your code with `TODO`s.

### 4.3.7 Amplification
A comment may be used to amplify the importance of something that may otherwise seem inconsequential.

```ts
let listItemContent: string = match.group(3).trim();
// The trim is real important. It removes the starting spaces that could cause the item to be recognized as another list.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
```

### 4.3.8 ~~Javadocs~~ Jsdocs in public APIs
If you are writing a public API, then you should certainly write good jsdocs for it. But keep in mind the rest of the advice in this chapter. Jsdocs can be just as misleading, nonlocal, and dishonest as any other kind of comment.

## 4.4 Bad comments
Most comments fall into this category. Usually they are crutches or excuses for poor code or justifications for insufficient decisions, amounting to little more than the programmer talking to himself.

### 4.4.1 Mumbling
Writing a comment just because you feel you should or because the process requires it, is a hack. If you decide to write one, then spend the time necessary to make it the best comment you can write.

*See page 60 for a thorough explanation.*

### 4.4.2 Redundant comments

### 4.4.3 Misleading comments

### 4.4.4 Mandated comments
> "It is just plain silly to have a rule that says that every function must have a jsdoc, or every variable must have a comment. Comments like this just clutter up the code, propagate lies, and lend to general confusion and disorganization." - Robert C. Martin

### 4.4.5 Journal comments

### 4.4.6 Noise comments

### 4.4.7 Scary noise

### 4.4.8 Position markers

### 4.4.9 Closing brace comments

### 4.4.10 Attributions and bylines
### 4.4.11 Commented-out code
> "Few practices are as odious as commenting-out code. Don't do this!" - Robert C. Martin

```js
axios.get(url)
  .then(response => this.setStudent(response))
  // .then(response => console.log(response))
  .catch(error => error)
```

Others who see that commented-out code won't have the courage to delete it. They'll think it is there for a reason and is too important to delete.
### 4.4.12 HTML comments

### 4.4.13 Nonlocal information
Make sure comments describe the code it appears near. Don't offer system wide information in the context of a local comment.

```ts
/**
* Port on which the app would run. Defaults to 3000.
*
* @param port
*/
function setPort(port: number) {
  this.port = port;
}
```

The previous example has no knowing of the default port whatsoever
