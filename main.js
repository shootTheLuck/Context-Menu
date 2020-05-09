
import ContextMenu from "./ContextMenu.js";
alert();
var test = document.getElementById("test");
var feedback = document.getElementById("feedback");

var contextMenu = new ContextMenu({handleMouseEvents: false});
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");

contextMenu.addEventListener("selection", function(evt) {
    feedback.innerText = "You selected: " + evt.detail.value;
    console.log("contextMenuSelect:", evt.detail.value);
    if (evt.detail.value === "Edit") {
        // transformControls.show();
    }
});

test.appendChild(contextMenu);

// use something like this if handleMouseEvents = false
test.addEventListener("contextmenu", function(evt) {
    if (evt.ctrlKey) {
        contextMenu.show(evt, "New Line");
    } else {
        contextMenu.show(evt);
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

document.addEventListener("mousedown", function(evt) {
    // alert();
    // console.log("mousedown");
});





