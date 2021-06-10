
import {ContextMenu} from "./ContextMenu.js";


var rectangleElement = document.getElementById("rectangle");
var squareElement = document.getElementById("square");
var feedback = document.getElementById("feedback");

// Instantiate and append to DOM.
// Set autoDisplay to false to make adjustments to menu before showing.
// The rectangle element has style "position: absolute" so set positionedFromParent to true
var contextMenu = new ContextMenu({autoDisplay: false, positionedFromParent: true});
contextMenu.addItem("Edit");
contextMenu.addItem("Back");
contextMenu.addItem("Create");
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

// Listen for click event or "selection" event to get contextMenu selection
// and use selection (or selectionDisabled) as required:

var squareColor = "red";
contextMenu.addEventListener("click", function(evt) {

    // handle disabled selection
    let selectionDisabled = contextMenu.selectionDisabled;
    if (selectionDisabled) {
        feedback.innerText =
                `The option "${selectionDisabled}" is not available for the ${squareColor} square.`;
        return;
    }

    // handle selection
    let selection = contextMenu.selection;
    feedback.innerText = "You selected: " + selection;

    let targetElement = contextMenu.selectedElement;
    if (targetElement === squareElement && selection === "Change Color") {
        let color = targetElement.style.backgroundColor;
        if (color === "red") {
            squareColor = "blue";
            targetElement.style.backgroundColor = "blue";
        } else {
            squareColor = "red";
            targetElement.style.backgroundColor = "red";
        }
    }
});

var loremIpsum2 = document.getElementById("lorem-ipsum2");
loremIpsum2.style.color = "blue";

var contextMenu2 = new ContextMenu();
contextMenu2.addItem("wow");
contextMenu2.addItem("great");
loremIpsum2.appendChild(contextMenu2);


// menu items can be removed or disabled temporarily
document.body.addEventListener("keydown", function(evt) {
    if (evt.key === "t") {
        contextMenu.removeItem("Create");
    }

    if (evt.key === "m") {
        contextMenu.disableItem("Create");
    }
});
