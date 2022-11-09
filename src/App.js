import React from 'react';
import ReactDOM from 'react-dom';


// react has one-way data flow i can pass data from app to pet but not pet to app
// if i have an issue in app i know it didn't come from pet, makes flow of data easier to follow
const Pet = (props) => {
  // want to use props from parent
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  // capitalized App is required
  return React.createElement(
    // printing html tags for you
    "div",
    {}, // attributes you put on the element
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        animal: "Dog",
        name: "Lucky",
        breed: "Dalmation",
      }),
      React.createElement(Pet, {
        animal: "Bird",
        name: "Tweety",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        animal: "Cat",
        name: "Buttercup",
        breed: "Siamese",
      }),
    ]
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // from react dom, new way of rendering to the dom
root.render(React.createElement(App));
