# Summary

Welcome to Dev notes. This will serve as a timeline and a place where you can see the logic and learning process that was followed to develop the project.

# Table of contents
- [07/02/2025](#07022025). Began javascript research.
- [08/02/2025](#080225025). Continuation of 07/08/2025.
- [09/02/2025](#09022025). Completion of JS.
- [11/02/2025](#11022025). Start of project development.
- [12/02/2025](#12022025). Completion of project development.
# Appendix

- [ChatGPT](https://chatgpt.com/)
- [W3](https://www.w3schools.com/js/)
- [VSCode Copilot](https://code.visualstudio.com/docs/copilot/setup-simplified)
- [FreeCodeCamp](https://www.freecodecamp.org/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/folder-structure-for-a-node-js-project/)

## 07/02/2025

Right so the timeframe for this is Wednesday 05/02/2025 till Wednesday 12/02/2025. I need to completely understand javascript as well as Node and how to make a full stack web app with that. Past experience with python and flask should make it relatively simple to learn javascript.

Right now Im following [W3 Javascript pathway](https://www.w3schools.com/js/). 

Got the basics of JS down. Seems very similar to python but a mixture of other static typed languages. 

**22:15** - I'll initialise git at this point however ill create a basic JS file so while im getting familiar you can see how everything goes. Ill use Node.js to run the code.

And a side note. Since the planning file is for a small project and everything will be dated as well. Tracking for this specific file will not be needed.

**23:04** - Got familiar with javascript objects at a very basic level. This is so weird in Javascript.

**23:14** - Difference between everything being an object in js and primitive types (Methods and props vs no methods and props).Mutability for objects (reference is fixed but not the value). Immutability for primitives. Remember pointers and all that.

**23:22** - Nested objects added. Making an array from object properties.

**23:30** - Used Copilot to see how to loop through an object and textify/tostring the data inside it. The code generated was copilot but made sense once reviewed. 

```javascript
let text = "";
for (let [key, value] of Object.entries(car)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
        text += key + ": " + JSON.stringify(value) + "<br>";
    } else if (typeof value === 'function') {
        text += key + ": " + value.call(car) + "<br>";
    } else {
        text += key + ": " + value + "<br>";
    }
}
console.log(text);
```

Json stringify function treats objects as JSON and converts the objects into strings.

**23:57** - Learnt how to make constructors. Make a function and add everything for an object into it. 
```javascript
function Car(company,name,model,colour){
    this.company = company;
    this.name = name;
    this.model = model;
    this.colour = colour;
}
const car1 = new Car("Toyota","Corolla","2019","White");
console.log(car1);
```
The **this** keyword only means the current object being created. 

## 08/02/2025

**00:23** - W3 did not have a very good explaination of default values so I used ChatGPT to explain instead.

```javascript
function Car(company,name,model,colour,wheelDrive = "front") {
    this.company = company;
    this.name = name;
    this.model = model;
    this.colour = colour;
    this.wheelDrive = wheelDrive;
}
```

We all know how default values work so no explaination. Only one thing specific to JS. If you pass null for a default argument it will be null. But pass undefined and it will use the default value. Sharp sharp👌. And if you want null to default to the default value (read this twice if you dont understand). Then add a ternary statement or if statement to check for null and use the default otherwise.

e.g. `this.name = (name !== undefined && name !== null) ? name : "John Doe";`

**00:40** - To know how to add functions and properties to contructors. We need to understand something called prototypes. 
e.g.
```javascript
Car.vin = "1234";  ❌
Car.prototype.vin = "123456789"; ✅
```
**15:50** - prototypes - inheritance of methods and properties of an object into another object. This was the original way to do inhertiance and whatnot in javascript before classes were added.
Of which classes are still just wrappers of prototypes.

TLDR. If you want to add methods and properties to a prototype. You have to call the base Function/constructor and then say .prototype and .whatever you want to add.
e.g.

```javascript
function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} barks.`);
};

```

**16:00** - HTML events. Anytime something happens in an html doc, you can follow up that action with an action from javascript code.
List of all events available [here](https://www.w3schools.com/jsref/dom_obj_event.asp). 

**16:30** - Strings as literals vs strings as objects(dont do this). Objects do not allow comparisons. Remember objects hold references and references will never be equal unless pointing to the same memory location. Check [here](https://www.w3schools.com/jsref/jsref_obj_string.asp) for everything relating to strings and [here](https://www.w3schools.com/js/js_string_methods.asp) for everything relating to string methods.

**16:43** - string interpolation. 
```javascript
const myString = "My age is ${age}"
```

string literals are hard to show on markdown but an example can be viewed [here](https://www.w3schools.com/js/tryit.asp?filename=tryjs_templates_multiline). 

**16:50** - Numbers are a single type in javascript. Double floating point for everything. 64 bits with bits 0-51 being the number, 52-62 being the exponent if there and bit 63 being the sign. 

| Type      | Precision (Digits) | Accuracy (Digits) |
|-----------|--------------------|-------------------|
| Integer   | 15                 | 15                |
| Decimal   | 17                 | 17                |
| Float     | 7                  | 7                 |
| Double    | 15-16              | 15-16             |

lil hint, you can use the toPrecision() function with a value to dictate the precision of a returned value. 

Also with expression evaluation it goes from left to right. So things like these two examples can occur. Be aware. 
[Example 1](https://www.w3schools.com/js/tryit.asp?filename=tryjs_numbers_add_strings3), [Example 2](https://www.w3schools.com/js/tryit.asp?filename=tryjs_numbers_add_strings4).

The + operator in js is a pain in the ass. It works for concatenation and additions however the other operators will work regardless whether you use a string or a number value. 
e.g. These all will work but Lord knows Im pulling my hair out at this point.
```javascript
let x = "100";
let y = "10";
let a = x / y;
let b = x * y;
let c = x - y;
```
Nan are not numbers. Duh. isNaN(val) tells you if something is or isnt a num. 

Infinity is also a thing. +/-. Loop to infinity. division by 0 gives infinity. All that.

Bigint is also a thing.

**17:05** - Okay at this point im skipping all the number stuff and not covering the entire thing on W3. Half of this stuff is not relevant to Node at this point in time. 

Touching on booleans. Anything with a value is truthy while no value or 0 is falsy.

| Operator | Description                        | Example       | Result |
|----------|------------------------------------|---------------|--------|
| ==       | equal to                           | x == 8        | false  |
|          |                                    | x == 5        | true   |
|          |                                    | x == "5"      | true   |
| ===      | equal value and equal type         | x === 5       | true   |
|          |                                    | x === "5"     | false  |
| !=       | not equal                          | x != 8        | true   |
| !==      | not equal value or not equal type  | x !== 5       | false  |
|          |                                    | x !== "5"     | true   |
|          |                                    | x !== 8       | true   |
| >        | greater than                       | x > 8         | false  |
| <        | less than                          | x < 8         | true   |
| >=       | greater than or equal to           | x >= 8        | false  |
| <=       | less than or equal to              | x <= 8        | true   |

Ternary statements. 
`variablename = (condition) ? value1:value2 `
```javascript
let voteable = (age < 18) ? "Too young":"Old enough";
```
**17:10** - Default Values with Nullish and Logical OR Operators

| Operator       | Example                              | Result          |
|----------------|--------------------------------------|-----------------|
| Nullish (??)   | `let name = null ?? "Default Name";` | "Default Name"  |
|                | `let age = undefined ?? 18;`         | 18              |
| Logical OR (||)| `let isActive = false || true;`      | true            |
|                | `let count = 0 || 10;`               | 10              |

The Nullish coalescence operator checks if the left side is either null or undefined, and if so, uses the value on the right. The logical OR operator checks if the value on the left is true; otherwise, it uses the value on the right.

The Optional Chaining Operator (?.)

The `?.` operator returns `undefined` if an object is `undefined` or `null` (instead of throwing an error).

**Example:**
```javascript
// Create an object:
const car = {type: "Fiat", model: "500", color: "white"};
// Ask for car name:
document.getElementById("demo").innerHTML = car?.name;
``` 

**17:20** - if statements same as c#. Switch statement same as c#. `Switch cases use strict comparison (===). The values must be of the same type to match.` For loops are the same as c# as well. 
- The for/in loop is to loop through object properties. 
- Also for arrays.

The thing to look at here is this. forEach(function). This makes the code execute a function on every item of an array. 
```javascript
const numbers = [45, 4, 9, 16, 25];

let txt = "";
numbers.forEach(myFunction);

function myFunction(value) {
  txt += value;
}
```
while loop same as C#. Do while as well. Break and continue are the same. 

However, in JavaScript, since everything works with code blocks and scope, you can label a code block and then use break or continue to affect the execution of that code block. Break without a label can only be used within loops or switch statements. 

You name a code block as such:

```javascript
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
```

In this example, the `break outerLoop;` statement will terminate the outer loop when `i` is 1 and `j` is 1.
You can do something similar with continue as well.

## 09/02/2025

**10:50** - Learnt about error handling. Same as c# as well. Jeez the similarities are endless.
However throw appears in the code itself and not in the function declaration.

**11:00** - HTML validation can be used instead of error handling for input fields.

**11:10** - Hoisting is annoying to deal with but the grand takeaway. Just dont use var for anything and use let and const. This entire Dillema is about when something is declared vs actually initialised.

```markdown
Hoisting is (to many developers) an unknown or overlooked behavior of JavaScript.

If a developer doesn't understand hoisting, programs may contain bugs (errors).

To avoid bugs, always declare all variables at the beginning of every scope.
```

**11:25** - use javascript in strict mode so that it behaves more like every other language as opposed to just javascript. Yunno what I mean. Add the string `use strict` at the top of the file. Strict mode stops you from using bad practice in your code.

**11:50** - Arrow functions are the same as c#. No need to have a function body for functions that have only a single line of code to return. `this` keyword refers to the instance of the object that called it. 

**12:10** - With using the this keyword with function declarations as such :
```javascript
// Regular Function:
let hello = function() {
  console.log(this);
};

window.addEventListener("load", hello); // `this` → window
document.getElementById("btn").addEventListener("click", hello); // `this` → button
```
This instance of this refers to the element that called this. Either the window when the window event triggers. Or the button.

```javascript
// Arrow Function:
hello = () => {
    document.getElementById("demo").innerHTML += this;
}

// The window object calls the function:
let hello = () => {
  console.log(this);
};

window.addEventListener("load", hello); // `this` → window
document.getElementById("btn").addEventListener("click", hello); // `this` → still window!
```
Otherwise in this case the this keyword used with this arrow function refer to the owner of the function. In this case the window. 

**12:38** - Damn this took forever but heres a breakdown after a lot of back and forth with chatGPT to explain the differences between arrow functions use of this and regular functions.

| **Feature**                  | **Regular Function**                                      | **Arrow Function**                               |
|------------------------------|------------------------------------------------------|------------------------------------------------|
| **`this` behavior**           | Dynamic (`this` depends on how the function is called) | Lexical (`this` is inherited from surrounding scope) |
| **Inside an object method**   | `this` refers to the object                           | `this` is inherited from outside (usually `window`) |
| **Inside a constructor (`new`)** | Works as expected (`this` refers to new object) | ❌ Cannot be used as a constructor (`TypeError`) |
| **Inside event listeners**    | `this` refers to the event target element           | `this` refers to the outer scope (not the element) |
| **Inside callbacks (`setTimeout`)** | `this` defaults to `window` (unless manually bound) | Inherits `this` from where it was defined |
| **Explicit binding (`call`, `apply`, `bind`)** | `this` can be changed using `.call()`, `.apply()`, `.bind()` | ❌ Cannot change `this` (ignored) |
| **Usage in array methods (`map`, `forEach`)** | Works, but requires `.bind(this)` if needed | ✅ Shorter and cleaner syntax, `this` is inherited |
| **Syntax**                   | `function keyword` required | `() =>` syntax is shorter |
| **Best for…**                 | Object methods, constructors, event handlers | Callbacks, array methods, preserving `this` |

Now finally the good stuff. Classes. These behave pretty similar to other languages and this is the default template for them.

```javascript
class ClassName {
    constructor() { ... }
    method_1() { ... }
    method_2() { ... }
    method_3() { ... }
}
```

**15:20** - importing and exporting are seperated into named and default exports. Named are where you specify one by one which functions or classes or properties from a file you want to import. Example utilities from a utilities file. Default export allows you to import one big important piece of code from another file but you can only default export a single thing from a file.

| Feature               | Named Export (`{}`)       | Default Export (No `{}`) |
|-----------------------|-------------------------|--------------------------|
| **Usage**             | Export multiple things from a file | Export one main thing from a file |
| **Import Syntax**     | `import { tool1, tool2 } from './file.js'` | `import Tool from './file.js'` |
| **Export Syntax**     | `export const tool1 = ...;`  | `export default function/class {}` |
| **Curly Braces `{}`** | ✅ Required when importing | ❌ Not required |
| **Can Rename on Import?** | ❌ No (unless using `as`) | ✅ Yes, rename freely |
| **Best For**          | Utility functions, constants, multiple exports | Single class, main function, or default object |
| **Example Use Case**  | `export function formatDate() {...}` → `import { formatDate } from './utils.js'` | `export default class User {...}` → `import User from './User.js'` |

---

### **🛠 When to Use Which?**
✔ **Use Named Exports (`{}`)** → When exporting **multiple things** (e.g., utilities, constants)  
✔ **Use Default Export (`no {}`)** → When exporting **one main thing** (e.g., a class, a single function)  

Information above from chatGPT.

**15:45** - Saw some stuff on [FreeCodeCamp](https://www.freecodecamp.org/news/javascript-concepts-to-know-before-learning-node-js/) about symbols. Good to look into in the future regarding safety and security measures. Theyre basically always unique.

**16:20** - JSON is perfect because it comes from JS originally. All you have to do is hit JSON.parse(text) and boom you have a json object that you can work with in the same format as a regular javascript object. Full json tutorial available [here](https://www.w3schools.com/js/js_json_intro.asp).


Debugging is simple. To set a breakpoint just call the `debugger` keyword before the line in which you want the debgging to start at. Video watched available [here](https://www.youtube.com/watch?v=ABlaMXkUwzY).

**18:25** - A self invoking function basically calls itself. This works because it is treated as an expression and not as a function declaration. Good for an initialiser function. e.g.
```javascript
(function() {
    console.log("This is a self-invoking function!");
})();
```

Functions have something called a rest parameter. Basically args from every other language. Its an array of values that can be past as a parameter. e.g.
```javascript
function sum(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

let x = sum(4, 9, 16, 25, 29, 100, 66, 77);
```

**18:47** - Now this is wild to wrap my head around but closures are a thing. Simplest way to explain it. You make a function that returns a function. But the first function initialises some variable that the 2nd function uses so when the 2nd function is returned it is now what is called and the variables originally created are whats edited and calledd. e.g.

```javascript
function createCounter() { 
  let count = 0; // This should disappear, right?
  
  return function() { 
    count++;  // But somehow, this still remembers count!
    return count;
  };
}

const add = createCounter(); 
console.log(add()); // 1
console.log(add()); // 2
console.log(add()); // 3
```
This made sense when I learned it so if you have any further questions just ask me.

**18:55** - Callbacks are basically passing a function into another function for that function to call the passed function. Different examples are using `setTimeout()` to run a function after some time, `setInterval` to run a function every some time. These make code very intuitive since you can choose how and what to run.

Promises are a serious pain in the ass and everything i seem to be reading suggests to just use async programming instead.

**20:00** - Await and aync took some time to understand but damn its pretty cool once you get used to it. Async functions return promises and await pauses the execution of code to wait for the async function to complete. Thats about it. and `.then` can be used with async but it will let code continue execution before the aync function is done but using the await keyword doesnt let that happen.

## 11/02/2025

**05:50** -  After completing a good chunk of javascript and learning the basics of node (its just a runtime allowing you to execute javascript outside of the web browser).
I can say now for this project it should be relatively easy.

There are 3 main components.
1. HTML front-end
2. Node Backend
3. MySQL database

The main functionality this program should have is:
- Capture car information.
- Display success statuses.
- Store this information.
- Display all stored information to User.
- Add a new car to the program every 20 minutes. 

Program should exhibit these key features:
- Must be modular by design
- Use of design patterns for easy extensibility and maintainability
- UI must look decent and not like a squirrel did it.

### Plan of action
1. Develop a basic node server. ✅
2. Research node folder structure and make the html pages required for this project. These pages won't have functionality just looks. ✅
3. Serve those html pages using the server. ✅
4. Now first develop the page that posts data over. Test if it works by entering something, posting it over to the server, and console.logging that thing out. ✅
5. Make a temporary data structure such as an array to store the data.✅
6. Make a few classes to represent the data that belong to the cars with their individual logic.✅
7. Now when the data is posted over save it into a car object and store it.✅
8. Now make the display html page. Just make a route that returns the car object list using JSON or some sort of data exhange(most probably JSON). Then make an html table to display the data on the front-end.✅
9. Once all of this works. I will add the 20 minute functionality that the original document stated. Adding a new vehicle every 20 minutes. Howver point to be noted there is no persistance once the server goes off. So i'll implement the database at this stage. If i do this thing right then we should be able to save data to the database in the same way the list allowed us to. And get data in the same way.
10. Add some code that can search for and display a specific cars infomation when an id is searched.✅

**16:00** - Have a basic node server file. Considered using Express but since Node is the topic the project is based on chose to use it. So heres the logic I have right now for developing this. 


**16:30** - Researched folder structure, gonna use [this](https://www.geeksforgeeks.org/folder-structure-for-a-node-js-project/) that I found. Making a public folder to store the HTML. 
- Now lets make an html page that will serve as the home page for the site.
- Then make the posting html page.
- Then the viewing html page. 

**17:30** - Used [this](https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module) website as a reference to see how to serve html pages from the node server. As well as some information about routing. The html pages were straight forward. 

**20:00** - Wasted nearly an hour over a stupid error and some file path resolution issues and how node servers handle static files. Tried to find solution online but could'nt find anything that held water. Used Copilot to help me debug what was wrong and i figured it was somrthing to do with file paths especially with how node was handling them. So heres a rough explaination of what it gave.
```markdown
path Resolution Issue

Original request: style.css
Server was adding 'public' twice: public/public/css/style.css
Caused ENOENT (file not found) error
Why It Happened

HTML requested: /css/style.css (correct)
Server code added './public' to path
But request already had '/public' in URL
Result: looked for file in wrong location
How It Was Fixed

Remove '/public' from incoming request URLs
Server now uses clean paths
Example:
Request: /css/style.css
Server path: style.css
```

**20:38** - Added the ability to post data between the front end and the backend. Had a simple html form with the fields requested here `Vehicle’s Make, Model, KM, Color, Location and Value`. Then refactored the back end to improve structure and use a switch statement instead of if statements. Moved the repetative logic of parsing the webpage information into a seperate function.

Realised we didnt have any seperate methods for posting data and the route the form needed to post to. Added that in but wasn't sure how to handle posted data in Node. 

Used copilot to assist me with data recieving and parsing for these lines specifically. Online sites such as stack overflow and GeeksforGeeks weren't very clear on how to do this using node and everything was pointing towards express.


```javascript
let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
```
&
```javascript
 const formData = new URLSearchParams(body);
```

**20:50** - Now hear me out for the temporary data structure. I thought I could make an interface called IDataPersistence. Then make a class called TempPersist which would be a simple list that can hold objects of the data passed to the program. So we create an object of it and use it while the program is active and it kills itself when the program shuts down. And then once all the logic works and the temporary storage is working. I'll create the database stuff. But since JS and Node don't have interfaces I have to do something special instead.

**23:00** - Okay so this did take some time and a bit of effort(and a few short breaks). But since JS and Node don't have interfaces and typescript just wasnt on the menu. I created a interface like construct that has the 2 defined functions a persistence layer should have for this app. Storing a single record and getting all records. I then made a dummy persistence class which just stores record objects in memory. Oh yeah and I created a record class with a function to validate if the vehicle record has data entered into all it's fields.

Connected the servers backend logic to create vehicle objects whenever the data is submitted and then sent that object over to the persistence layer. At this point it just saves and adds and ID  value based on the amount of objects stored.

**23:50** - Completed the display of the data stored in the temporary storage. Also added the function that adds records periodically. Pretty easy once everything is a bunch of Objects.

## 12/02/2025

**00:20** - Completed the display for the cars. Converted the list of vehicle objects to JSON. Then sent that to the frontend via an api link since the frontend will have a solid link to recieve its data from. Then this will be displayed dynamically using a javascript script to iterate through the JSON and display it on the front-end.  

Then there the function that lets you search for a vehicle. It just gets the text of the input element. Locates that in the carsData element. And if a record does exist. Just extract its data and display in an html table made of divs and p tags since those can be arranged vertically as opposed to horizontally.

**12:54** - The development of the project has been smooth sailing so far. I've learned JavaScript and understood how NodeJS works, including building a server without ExpressJS.

The main roadblock is the memory-based data storage, which disappears when the server goes down. Instead of using MySQL, I've created a temporary data structure to hold data, which returns data as JSON.

The problem is that MySQL and MSSQL are refusing to connect on my computer, despite working perfectly on another machine. This is causing issues with implementing the database.

The upside is that the code is modular and object-oriented, making it easy to switch between the dummy data storage object and the real database storage object. I created a temporary interface with AI assistance since NodeJS doesn't support interfaces.

**16:00** - Adding the database was really irritating due to issues with the external mssql and mysql applications. Also it would have been hard to share a full on database connection with you. However due to this project being really modular. You can easily swap between the dummy and live databases at the top of the server file. The server file was made into an async function aswell to remedy I/O wait times.

I might add a few CSS touch ups to this project just to spruce things up but the overall project is done.
Please return to [README](../README.md)