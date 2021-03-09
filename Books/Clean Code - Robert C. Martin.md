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
    - [4.4.8 Don't use a comment when you can use a function or a variable](#448-dont-use-a-comment-when-you-can-use-a-function-or-a-variable)
    - [4.4.9 Position markers](#449-position-markers)
    - [4.4.10 Closing brace comments](#4410-closing-brace-comments)
    - [4.4.11 Attributions and bylines](#4411-attributions-and-bylines)
    - [4.4.12 Commented-out code](#4412-commented-out-code)
    - [4.4.13 HTML comments](#4413-html-comments)
    - [4.4.14 Nonlocal information](#4414-nonlocal-information)
    - [4.4.15 Too much information](#4415-too-much-information)
    - [4.4.16 Unobvious connection](#4416-unobvious-connection)
    - [4.4.17 Function headers](#4417-function-headers)
    - [4.4.18 Jsdocs in nonpublic code](#4418-jsdocs-in-nonpublic-code)
    - [4.4.19 Example](#4419-example)
  - [5.0 Formatting](#50-formatting)

# Introduction
I started reading this book prior to creating this repo hence why there are missing chapters. I'm continuing where I left off and will fill in the gaps eventually.

Code examples are directly taken from the book and translated to TypeScript or JavaScript where applicable.

# 4.0 Comments
> "Don't comment bad code—rewrite it." —Brian W. Kernighan and P.J. Plaugher

* Comments are not "pure good."
* Comments  are to compensate for our failure to express ourself in code.
  * Therefore, **comments are always failures.**
* > "Because they lie. Not always, and not intentionally, but too often." - Uncle Bob
  * A comment is more likely to be plain wrong when
    * The older a comment is
    * The farther away it is from the code it describes
  * Programmers realistically can't maintain them.
* Inaccurate comments are worse than no comment at all

To follow up previous chapters that are all about making code clear enough that it tells a story as to what the code actually does. When code is self-explanatory there is no need to further explain your code with comments. Comments are temporary because code changes and evolves, thus rendering the comment useless and if not worse: misleading.

It is possible to make a point that programmers should put in a disciplined effort to keep their comments in a high state of repair, relevance and accuracy but that time and energy could be much better spent refactoring the code to not need a comment at all.

> "Truth can only be found in one place: the code. Only the code can truly tell you what it does. It is the only source of truly accurate information. Therefore, though comments are sometimes necessary, we will expend significant energy to minimize them." - Uncle Bob

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
```js
// Utility method that returns when this.closed is true. Throws an exception if the timeout is reached.
function waitForClose(timeoutInMilliseconds) {
  if (!this.closed) {
    setTimeout(function(){
      if (!this.closed) {
        throw Exception("Could not close!")
      },
      timeoutInMilliseconds
    })
  }
}
```

The above code shows a simple function with a header comment that is completely redundant. The comment probably takes longer to read than the code itself. Uncle Bob wrote a beautiful metaphor in the book:

> "It is rather like a glad handing used-car salesman assuring you that you don't need to look under the hood." - Uncle Bob

Now think about the potential clutter that redundant comments serve. Have you ever worked on a project where colleagues/classmates were adamant on writing Jsdocs for *every* method? See `Listing 4-2 ContainerBase.java (Tomcat)` in the book at page 61. I personally have worked in a team where it was decided that documenting every single controller method is necessary; you should not do that because clean code speaks for itself, these comments serve only to clutter and obscure code.

### 4.4.3 Misleading comments
Sometimes, with all best intentions, a programmer makes a statement in his comments that isn't precise enough to be accurate. Take a look at the redundant but also misleading comment in [4.4.2 Redundant comments](#442-redundant-comments).

Can you spot how the comment was misleading? The method does not return *when* `this.closed` becomes `true`. It returns *if* this.closed is `true`; otherwise, it waits for a blind time-out and then throws an exception *if* `this.closed` is still not `true`.

> "This subtle bit of misinformation, couched in a comment that is harder to read than the body of the code, could cause another programmer to blithely call this function in the expectation that it will return as soon as `this.closed` becomes `true`." - Uncle Bob

### 4.4.4 Mandated comments
> "It is just plain silly to have a rule that says that every function must have a jsdoc, or every variable must have a comment. Comments like this just clutter up the code, propagate lies, and lend to general confusion and disorganization." - Uncle Bob

Nuff said.
### 4.4.5 Journal comments
This is a no brainer. Apparently some programmers keep a changelog in the source files like so:

```js
/*
* Changes from (11-Oct-2015)
* --------------------------
* 11-Oct-2015 : Re-organized the class and moved it to new file someFile.js
* 05-Nov-2015 : Added a getDescription() method
*/

// rest of your code
```

With source control software like git there really should be no valid reason to do this at all folks. Better yet, if you do this in one of my projects I'm going to berate you for it.

### 4.4.6 Noise comments
Sometimes you see comments that are nothing but noise. They restate the obvious and provide no new information.

```js
class Rectangle {
  /**
  * Default constructor
  */
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
No shit, Sherlock. Or how about this:

```js
/** The day of the month */
const dayOfTheMonth;
```

And then there's this paragon of redundancy:

```js
/**
* Returns the day of the month.
*
* @return the day of the month.
*/
function getDayOfMonth() {
  return dayOfMonth;
} 
```

> "These comments are so noisy that we learn to ignore them. As we read through code, our eyes simply skip over them. Eventually the comments begin to lie as the code around them changes." - Uncle Bob

It is alright to provide a comment when you're deviating from the programming language's intended way to be used, such as ignoring a `catch`. See page 65 `Listing 4-4 startSending`.

> "Replace the temptation to create noise with the determination to clean your code. You'll find it makes you a better and happier programmer." - Uncle Bob

### 4.4.7 Scary noise
Jsdocs can also be noisy. What's the purpose of this:

```ts
/** The name. */
private const name: string;

/** The version. */
private const version: string;

/** The licenseName. */
private const licenseName: string;

/** The version. */
private const info: string;
```

Answer: none. Also see the copy-paste mistake? If authors aren't paying attention when comments are written (or pasted), why should readers be expected to profit from them?

### 4.4.8 Don't use a comment when you can use a function or a variable
I'm too lazy to take notes on this one.

### 4.4.9 Position markers
Sometimes programmers, me sometimes included, like to marka particular position in a source file. For example like this:

`// Actions //////////////////`

There are rare times when it makes sense to gather certain functions together beneath a banner like this. But in general they are clutter and should be avoided. Think of it this way. A banner is startling and obvious if you don't see banners very often. So use them sparingly and only when a banner is significant.

I personally think that if you feel the need to put banners everywhere in a single file, then you should refactor and divide your code by each category into new files accordingly. If it makes sense to do so at least.

### 4.4.10 Closing brace comments
I haven't seen this one before but sometimes programmers like to put a comment at closing braces. I don't think I need to clarify this more other than telling you not to do it. People usually do this when a function is very long and nests deeply. If that's your case then you should refactor to make the function shorter.

### 4.4.11 Attributions and bylines
`/** Added by Rick */`

I don't think the above comment needs much explanation on why not to do it. Again, source control takes care of this way better than a human ever will. Keep in mind that code changes over time and these comments rarely do.

### 4.4.12 Commented-out code
> "Few practices are as odious as commenting-out code. Don't do this!" - Uncle Bob

```js
axios.get(url)
  .then(response => this.setStudent(response))
  // .then(response => console.log(response))
  .catch(error => error)
```

Others who see that commented-out code won't have the courage to delete it. They'll think it is there for a reason and is too important to delete.
### 4.4.13 HTML comments
I haven't seen this one in the wild before and I hope I never will. You can already imagine how horrible html in comments would look. IF comments are going to be extracted by some tool (like Jsdoc) to appear in a webpage, then it should be the responsibility of that tool, and not the programmer, to adorn the comments with appropriate html.

### 4.4.14 Nonlocal information
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

The previous example has no knowing of the default port whatsoever.

### 4.4.15 Too much information
The book shows a code example where a paragraph of the RFC 2045 spec is copy-pasted. This is a highly irrelevant description of detail. Other than the RFC number, someone reading this code has no need for arcane information contained in the comment.

*See page 70 for an example. Although it this is pretty straightforward.*

### 4.4.16 Unobvious connection
The connection between a comment and the code it describes should be obvious.

```js
// start with an array that is big enough to hold all the pixels (plus filter bytes), and an extra 200 bytes for header info
this.pngBytes = new byte[((this.width + 1) * this.height * 3) + 200]
```

> "What is a filter byte? Does it relate to the +1? Or to the *3? Both? Is a pixel a byte? Why 200? The purpose of a comment is to explain code that does not explain itself. It is a pity when a comment needs its own explanation." - Uncle Bob

### 4.4.17 Function headers
> "Short functions don't need much description. A well-chosen name for a small function that does one thing is usually better than a comment header." - Uncle Bob

### 4.4.18 Jsdocs in nonpublic code
> "As useful as Jsdocs are for public APIs, they are anathema to code that is not intended for public consumption. Generating Jsdoc pages for the classes and functions inside a system is not generally useful, and the extra formality of the Jsdoc comments amounts to little more cruft and distraction" - Uncle Bob

### 4.4.19 Example
It's better to see this subchapter for yourself at page 71. Uncle Bob explains that he made an example of a badly coded class and challenges you to find the mistakes. He then follows up with a refactored version and his reasons why the comments in the refactored version are good.

## 5.0 Formatting
This is an interesting chapter that crossed my mind by coincidence while I was chaining a bunch of `.then`s vertically.