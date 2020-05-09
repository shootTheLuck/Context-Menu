
import ContextMenu from "./ContextMenu.js";

var rectangleElement = document.getElementById("rectangle");
var squareElement = document.getElementById("square");
var feedback = document.getElementById("feedback");

var contextMenu = new ContextMenu({handleMouseEvents: false});
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");
rectangleElement.appendChild(contextMenu);

var target = null;

contextMenu.addEventListener("selection", function(evt) {
    feedback.innerText = "You selected: " + evt.detail.value;
    console.log("contextMenuSelect:", evt.detail.value);
    if (evt.detail.value === "Change Color") {
        target.style.backgroundColor = "blue";
    }
});

// use something like this if handleMouseEvents = false
rectangleElement.addEventListener("contextmenu", function(evt) {
    if (evt.target === squareElement) {
        contextMenu.show(evt, "Change Color");
        target = squareElement;
    } else {
        contextMenu.show(evt);
        target = null;
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
