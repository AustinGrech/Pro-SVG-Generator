const inquirer = require("inquirer");

const fs = require("fs");

const { Circle, Square, Triangle } = require("./lib/shapes");

class Svg {
  constructor() {
    this.newText = "";
    this.newShape = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.newShape}${this.newText}</svg>`;
  }
  setNewText(text, color) {
    this.newText = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setNewShape(shape) {
    this.newShape = shape.render();
  }
}

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to (3) Characters for your logo:",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter a color for your text (OR a hexadecimal number):",
  },
  {
    type: "input",
    name: "shape",
    message: "Enter a color for your shape (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "chosenShape",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
];
// Function to write data to file
function writeToFile(fileName, data) {
  console.log("Writing [" + data + "] to file [" + fileName + "]");
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Generated logo.svg");
  });
}

async function init() {
  console.log("Starting init");
  var svgString = "";
  var svgFileName = "logo.svg";

  // Prompt the user for answers
  const answers = await inquirer.prompt(questions);

  //user text
  var userText = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    // 1-3 chars, valid entry
    userText = answers.text;
  } else {
    // 0 or 4+ chars, invalid entry
    console.log(
      "Invalid user text field detected! Please enter 1-3 Characters, no more and no less"
    );
    return;
  }

  userText = answers.text;
  userTextColor = answers["textColor"];
  userShapeColor = answers.shape;
  userShapeType = answers["chosenShape"];

  //user shape
  let userShape;
  if (userShapeType === "Square" || userShapeType === "square") {
    userShape = new Square();
    console.log("User selected Square shape");
  } else if (userShapeType === "Circle" || userShapeType === "circle") {
    userShape = new Circle();
    console.log("User selected Circle shape");
  } else if (userShapeType === "Triangle" || userShapeType === "triangle") {
    userShape = new Triangle();
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape!");
  }
  userShape.setColor(userShapeColor);

  // Create a new Svg instance and add the shape and text elements to it
  var svg = new Svg();
  svg.setNewText(userText, userTextColor);
  svg.setNewShape(userShape);
  svgString = svg.render();

  //Print shape to log
  console.log("Displaying shape:\n\n" + svgString);
  //document.getElementById("svg_image").innerHTML = svgString;

  console.log("Shape generation complete!");
  console.log("Writing shape to an svg file...");
  writeToFile(svgFileName, svgString);
}
init();
