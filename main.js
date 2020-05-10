
import ContextMenu from "./ContextMenu.js";

var rectangleElement = document.getElementById("rectangle");
var squareElement = document.getElementById("square");
var feedback = document.getElementById("feedback");

var contextMenu = new ContextMenu({autoDisplay: false});
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");
rectangleElement.appendChild(contextMenu);


// use something like this if handleMouseEvents = false
contextMenu.addEventListener("rightClick", function(evt) {
    let targetElement = evt.detail.value.target;
    console.log("contextMenu right click on html target:", targetElement);
    if (targetElement === squareElement) {
        contextMenu.show(evt.detail.value, "Change Color");
    } else {
        contextMenu.show(evt.detail.value);
    }
});

// use something like this if handleMouseEvents = false
// rectangleElement.addEventListener("contextmenu", function(evt) {
    // if (evt.target === squareElement) {
        // contextMenu.show(evt, "Change Color");
    // } else {
        // contextMenu.show(evt);
    // }
// });

contextMenu.addEventListener("selection", function(evt) {
    let selectedValue = evt.detail.value;
    let targetElement = evt.detail.initialClick.target;

    feedback.innerText = "You selected: " + selectedValue;
    console.log("contextMenu selection:", selectedValue);
    console.log("contextMenu original target:", targetElement);

    if (targetElement === squareElement && selectedValue === "Change Color") {
        targetElement.style.backgroundColor = "blue";
    }
});

document.addEventListener("keydown", function(evt) {
    if (evt.key === "t") {
        contextMenu.removeMenuOption("Create");
    }
    if (evt.key === "m") {
        contextMenu.disableItem("Create");
    }
});
