
import {ContextMenu} from "./ContextMenu.js";


var rectangleElement = document.getElementById("rectangle");
var squareElement = document.getElementById("square");
var feedback = document.getElementById("feedback");

// Instantiate and append to DOM.
// Set autoDisplay to false to make adjustments to menu before showing.

var contextMenu = new ContextMenu({autoDisplay: false});
// var contextMenu = new ContextMenu();
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");
rectangleElement.appendChild(contextMenu);

// If autodisplay = false, listen for contextmenu event from page element.
// Make decisions on what to show in the menu based on event target
// before displaying.

rectangleElement.addEventListener("contextmenu", (evt) => {
    let targetElement = evt.target;
    if (targetElement === squareElement) {
        contextMenu.disableItem("Edit");
        contextMenu.show(evt, "Change Color");
    } else {
        contextMenu.show(evt);
    }
});

// Listen for click event to get contextMenu selection.

contextMenu.addEventListener("click", function(evt) {
    let selection = contextMenu.selection;
    feedback.innerText = "You selected: " + selection;

    let targetElement = contextMenu.selectedElement;
    if (targetElement === squareElement && selection === "Change Color") {
        let color = targetElement.style.backgroundColor;
        if (color === "red") {
            targetElement.style.backgroundColor = "blue";
        } else {
            targetElement.style.backgroundColor = "red";
        }
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
