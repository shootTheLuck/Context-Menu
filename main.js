
import {ContextMenu} from "./ContextMenu.js";


var rectangleElement = document.getElementById("rectangle");
var squareElement = document.getElementById("square");
var feedback = document.getElementById("feedback");

/////////////////////// ContextMenu for Rectangle //////////////////////////

// Instantiate and append to DOM.
// The rectangle element has style "position: absolute" so set positionedFromParent to true
// Set autoDisplay to false to make adjustments to menu before showing:

var contextMenu = new ContextMenu({autoDisplay: false, positionedFromParent: true});
contextMenu.addItem("Edit");
contextMenu.addItem("Back");
contextMenu.addItem("Create");
rectangleElement.appendChild(contextMenu);

// Listen for contextmenu event from its parent element.
// Make decisions on what to show in the menu before displaying:
rectangleElement.addEventListener("contextmenu", (evt) => {
    let targetElement = evt.target;
    if (targetElement === squareElement) {
        contextMenu.disableItem("Edit");
        contextMenu.show(evt, "Change Color");
    } else {
        contextMenu.show(evt);
    }
});

// Listen for click event or "itemSelected" event from contextMenu.
// Use contextMenu.itemSelected or (.itemDisabled) as required:
contextMenu.addEventListener("click", function(evt) {

    // itemDisabled is exposed for user assistance etc:
    let selectionDisabled = contextMenu.itemDisabled;
    if (selectionDisabled) {
        feedback.innerText =
                `The option "${selectionDisabled}" is not available for the center square.`;
        return;
    }

    // handle selection
    let selection = contextMenu.itemSelected;
    feedback.innerText = "You selected: " + selection;

    let targetElement = contextMenu.targetElement;
    if (targetElement === squareElement && selection === "Change Color") {
        let color = targetElement.style.backgroundColor;
        if (color === "red") {
            targetElement.style.backgroundColor = "blue";
        } else {
            targetElement.style.backgroundColor = "red";
        }
    }
});


/////////////////////// ContextMenu for blue text //////////////////////////

var loremIpsum2 = document.getElementById("lorem-ipsum2");
loremIpsum2.style.color = "blue";

var contextMenu2 = new ContextMenu();
contextMenu2.addItem("wow");
contextMenu2.addItem("great");
loremIpsum2.appendChild(contextMenu2);

contextMenu2.addEventListener("itemSelected", (evt) => {
    // feedback.innerText = "You selected: " + contextMenu2.itemSelected;
    feedback.innerText = "You selected: " + evt.value;
});

contextMenu2.addEventListener("itemHovered", (evt) => {
    console.log(evt.value);
    // feedback.innerText = "You selected: " + contextMenu2.itemSelected;
});


//////////// menu items can be removed or disabled temporarily ////////////

document.body.addEventListener("keydown", function(evt) {
    if (evt.key === "t") {
        contextMenu.removeItem("Create");
    }
    if (evt.key === "m") {
        contextMenu.disableItem("Create");
    }
});
