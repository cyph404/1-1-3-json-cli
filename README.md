# Lab 1.3.0 - Building a CLI CRUD App With JSON

- [Lab 1.3.0 - Building a CLI CRUD App With JSON](#lab-130---building-a-cli-crud-app-with-json)
- [Welcome to your second lab!](#welcome-to-your-second-lab)
  - [What is CRUD?](#what-is-crud)
  - [Why JSON?](#why-json)
- [The Ask](#the-ask)
- [Features](#features)
- [Choosing Foundations, MVP, and stretch features](#choosing-foundations-mvp-and-stretch-features)
- [Research](#research)
  - [Starter code](#starter-code)
  - [fs, \_\_dirname and path](#fs-__dirname-and-path)
  - [Try/Catch](#trycatch)
  - [Writing and reading files](#writing-and-reading-files)
  - [Converting text to JSON](#converting-text-to-json)
  - [Understanding the flow](#understanding-the-flow)
- [Step 0: Getting setup!](#step-0-getting-setup)
  - [pushing to github](#pushing-to-github)
- [Foundations: Getting our CLI menu and user input rendering](#foundations-getting-our-cli-menu-and-user-input-rendering)
- [Foundations: Reading the JSON file](#foundations-reading-the-json-file)
- [MVP: Creating a new to do item](#mvp-creating-a-new-to-do-item)
- [MVP: Reading all to do items](#mvp-reading-all-to-do-items)
- [Stretch: Deleting a to do item](#stretch-deleting-a-to-do-item)
- [Stretch: Deleting all to do items](#stretch-deleting-all-to-do-items)
- [Closing thoughts](#closing-thoughts)


# Welcome to your second lab!
If you haven't completed [the first lab, the CLI app](https://github.com/The-Marcy-Lab-School/1-0-3-lab_project_planning_cli_app), please complete that first. Because today's app will build on the lessons we learned there. Today, we're going to be using JSON format you learned about to write files to store our data so we can start to learn about CRUD!

## What is CRUD?
CRUD is an acronym, where each letter stands for an action:
- Create
- Read
- Update
- Delete

That's it, just those four simple actions. But this is the cornerstone of pretty much all applications. If you can take data and create a new entry, read that entry, update that entry, and delete that entry, you're off to a fantastic start. By the way, when we say "read" think of it as displaying or loading data. The key point is that when you read, you don't *change* anything.

## Why JSON?
JSON is a file format that is very easy to read and write. You saw that it's basically just a JS object with a few extra rules:
- All keys must be double quoted
- No trailing commas allowed
- Can't use functions

JSON is actually such a good format that you'll see it in practically every modern programming language out there, as well as being basically the default way to transfer data between websites.


# The Ask
Today, we're going to not do the *full* CRUD, well start simple with just C, R, and D to build a To Do list CLI app. The ask for this app would be:

> We can *create* new to do list items, *read* our list of to dos, and then complete them by *deleting* them. The data should persist across sessions (ie, if I close the program and reopen it, my to do list should still be there)

Sound fun? Let's go!

# Features
Alright, so that's the ask, it's time to break down the project into user stories

A user:
- Will be greeted with an options menu to start
- Can choose from the actions on the menu what to do
- After each action is complete, will be returned to the menu
- Can create a new to do item
- Can read their to do list with all their items
- Can select an individual to do item to delete
- Can delete all to do items
- Can exit the program
- Will be able to see their to do list when they start the program again

That's a pretty concise list of features, and it's a good start.

# Choosing Foundations, MVP, and stretch features

OK, so just like last time, let's think about the chunks of work we can start. How would you break this down? It's sneaky this time, because there's some tech groundwork that we need to lay that the user won't actually see. Think about it and then pop open the summary to see if we landed on the same work flow

<details>
    <summary>Foundations</summary>
    <ul>
      <li>Will be greeted with an options menu to start</li>
      <li>Can choose from the actions on the menu what to do</li>
      <li>After each action is complete, will be returned to the menu</li>
      <li>A user can exit the program </li>
      <li>We can read a JSON file with data on program start</li>
    </ul>
</details>

<details>
    <summary>MVP</summary>
    <ul>
      <li>We can update our JSON file with new data</li>
      <li>A user can create a new to do item</li>
      <li>A user can read all their to do items</li>
    </ul>
</details>

<details>
    <summary>Stretch</summary>
    <ul>
      <li>A user can delete a to do item</li>
      <li>A user can delete all to do items </li>
    </ul>
</details>

Little tricky with the JSON steps right? That read/write file flow wasn't a literal user story, but we need it when we start. In general, when you're working on a project that has the ability to persist data in a meaningful way, you want to pretty much have that logic figured out before you get too far.

By the way, this sort of data is called your programs "state." So when we say "persisting state" we mean that our program essentially knows where it left off when it turns back on. When we say "state" just think about the data that your program needs to know about to function.

This is all to prepare you for the idea of "databases" which allow us to store massive amounts of data in a very concise and efficient way. But that's a topic for later. For now, let's get started just with the idea of CRUD on an external data source.

# Research
The biggest aspect that's new to this project is the ability to read and write to a JSON file. So let's start there. There are a *lot* of ways to do this, but lets keep it simple with Node's built in functions:

- path.join - allows us to make sure we get file paths consistent across operating systems
- fs.readFileSync - allows us to read a file
- fs.writeFileSync - allows us to write a file
- JSON.parse - allows us to turn a string into a JS object
- JSON.stringify - allows us to turn a JS object into a string
- try/catch - allows us to handle errors

Let's assume that the JSON file already exists because you'll create it to start (to keep it simple, you certainly could create it in code, but that's a little more advanced)

This is a good starting point for reading JSON files: [https://cratecode.com/info/nodejs-fs-readfilesync-usage](https://cratecode.com/info/nodejs-fs-readfilesync-usage)

## Starter code
Now, we'll more or less let you research on your own, see what you find! But here's a nice little piece of starter code to make sure you don't get *too* far from what we're aiming for. This is  assuming you're running a js file like `index.js` *next to* an already existing file called `to-dos.json`. It can be a totally empty file!

```js
const fs = require("fs");
const path = require("path");

const toDoJsonFilePath = path.join(__dirname, "to-dos.json");

try {
  const toDoList = ['Take out garbage'];
  fs.writeFileSync(toDoJsonFilePath, JSON.stringify(toDoList));

  const toDoListRaw = fs.readFileSync(toDoJsonFilePath, "utf-8");
  const jsonData = JSON.parse(toDoListRaw);
  console.log(jsonData);
} catch (error) {
    console.error("Error reading JSON file:", error);
}
```

Woah! That's a lot of code you've never seen before! Don't panic, let's just read it step by step. Some of it you *do* know, just in a new way!

## fs, __dirname and path
We're requiring some modules that are built into node "fs", which is the file system and let's us manipulate files, and "path" which is a module that lets us build file paths to things.

Then we're using a keyword `__dirname`. That's a special node variable that simply returns the directory that the module is currently in. This is cool because it lets us use an absolute path `/users/mike/example` as opposed to having to rely on a relative path `./example`, which may not work in some server situations.

Then we're using `path.join` to combine our directory with `to-dos.json` to get a full file path. Try console.logging that variable to see what it is!

## Try/Catch
Next comes something called a `try/catch` block. This is a way to handle errors. What's an error? It basically means that something went wrong with your code, and JS doesn't know what to do. So when we do actions that may break (like reading files or parsing JSON), we can wrap those actions in a `try/catch`. That says "hey, try to run this block of code, if it breaks, run the catch block to deal with the error."
Here are [the `try/catch` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) if you want to read more!

## Writing and reading files
Then we're doing the important part: writing our list to the file and then reading it back. We're using `fs.writeFileSync` to write the file, and `fs.readFileSync` to read it back. We're also using `JSON.stringify` to turn our array into a string, and `JSON.parse` to turn it back into an array.

## Converting text to JSON
Why the conversion? Because we can't write JSON directly to a file, first we have to convert it into text. Then, when we want to use the data from the file, we need to convert the text back into JSON. *All* files are just text, its up to our program to parse them. Even a .png is just text, programs are just built to render out the data!

## Understanding the flow
This is a lot of code to play with! Honestly, if you just spend your time experimenting and Understanding this flow of:

- get data
- convert data to text
- write text to file
- read text from file
- convert to JSON

You'll be in a great spot. It's a pretty universal pattern. Take some time to get a feel for it! And again, there are a *lot* of ways to actually do those steps in Node. With things like callbacks, buffers, streams, other file formats, etc. But this is a great starting point!

# Step 0: Getting setup!
Ok, so now that we have the main research out of the way, let's begin by setting up a new project.

```bash
# The default start to most projects
mkdir my-json-cli
cd my-json-cli
git init
touch .gitignore
echo "node_modules" >> .gitignore
npm init -y

# Getting started for this project
npm install prompt-sync
touch index.js
touch to-dos.json
```

So we're doing the standard stuff here.
- Making a directory, getting into it
- initializing git,
- creating a .gitignore and inserting "node_modules" into the text so that we don't push up our node modules file to github later
- initializing npm by creating a package.json with default options (the -y flag)
- installing prompt-sync so we can get user input

If any of those steps confuse you, of course Google it! Not super sure what a `.gitignore` file does? Read some blogs! The *world* is at your fingertips, let no question remain unanswered! Curiosity is your greatest asset, use it!

## pushing to github
Do it early and often! Once you have your project, make sure you push it up to github so you can share it with your instructors. Get in the habit of making lots of small, focused commits, and pushing up to your remote repo so you never lose your progress.

# Foundations: Getting our CLI menu and user input rendering
Remember how we worked with the `prompt` package?

```js
const prompt = require('prompt-sync')({ sigint: true });

const name = prompt("What's your name? ");
const age = prompt("What's your age? ");
console.log(typeof name)
console.log(typeof age)
```

Last time, we only used a function to run once, but this time we're going to use it in a while loop. But *we* aren't going to tell you how! Take the bulk of work from the previous lab, with all the menu and input logic, and apply that here. We want our menu to have 3 options:

- Create a new to do item
- Read all to do items
- delete a to do item
- delete all to do items
- exit

And with the exception of `exit`, use a `while` loop to make sure they always return to the menu after they complete an action.

Now, we aren't going to make all of those options functional in the foundations phase of course, but that's what the end result options should be. Remember how we can use numbers to allow users to select the option they want?

Anyway, it's up to you to get the portion of the foundations up and running with inputs and loops.

# Foundations: Reading the JSON file
This is the part we researched mechanically, now how do you want to structure your app? We'll talk about best practices to structure your data in the next lab, here we really want you to play around on your own and see what you come up with. Hint, wrap your getter and setter logic in functions, and only use those specific functions to read and write your data.

# MVP: Creating a new to do item
What data do you want to take in from the user? Probably just the string of the to do itself. But here's the trick, when you want to save this item to a file, be careful! We're doing a full rewrite of the file, not an append (append means adding something to the end of something). So you'll always want to read the file's current array of to dos, append this new to do to that array, and then write the whole array back to the file to save it.

# MVP: Reading all to do items
This is pretty simple, just read the file and display the data. But remember, you'll need to convert the JSON input from text to an object, and then convert the object back to text to save it to our JSON file. Think back to the flow from our research!

# Stretch: Deleting a to do item
This is a little tricky, because you have to give the user the ability to pick the to do they would like to delete. With your current tool set, we recommend listing the items in order, and then letting the user select by their index. Then splice that item out of the array, and write the new array back to the file.

# Stretch: Deleting all to do items
This is a little easier, just write an empty array to the file!


# Closing thoughts
This lab felt a little more vague than last time, huh? Good! Assignments are for you to see the exact raw skills on your own, but labs should be all about taking a project and then figuring out own how to get it done. Learning the skill of breaking down tasks is *crucial* to being a strong developer. These labs are a great way to dip your toe into the pool with new concepts and see how they feel. When all else fails, go back to the ask and the user stories.

> Did you build what we asked for? *How* you build is up to you. And there are "right-er" ways and wrong ways, but ultimately this is about exploration.

Good luck, and have fun!