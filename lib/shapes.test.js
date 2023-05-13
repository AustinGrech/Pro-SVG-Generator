const { Circle, Square, Triangle, Rectangle } = require("./shapes");
// Imports the Circle, Square, and Triangle shape classes from the 'shapes.js' module and defines a test suite for the shape class.
// The test case checks whether "Cricle, Square, and Triangle" object can be rendered correctly by calling the render method and comparing the result to an expected SVG string.

// Circle Shape
describe("Circle", () => {
  // Circle shape is rendered correctly
  test("renders correctly", () => {
    const newCircle = new Circle();
    const color = "red";
    newCircle.setColor(color);
    expect(newCircle.render()).toEqual(
      `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`
    );
  });
});

// Square Shape
describe("Square", () => {
  test("renders correctly", () => {
    const newSquare = new Square();
    var color = "green";
    newSquare.setColor(color);
    expect(newSquare.render()).toEqual(
      `<rect x="50" height="200" width="200" fill="${color}">`
    );
  });
});

// Triangle Shape
describe("Triangle", () => {
  // Triangle shape is rendered correctly
  test("renders correctly", () => {
    const newTriangle = new Triangle();
    const color = "orange";
    newTriangle.setColor(color);
    expect(newTriangle.render()).toEqual(
      `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${color}">`
    );
  });
});
