## What is this?
A ContextMenu class made using vanilla Javascript and the Custom Elements API.

[Live Demo Here](https://shootTheLuck.github.io/Context-Menu)

## How do I use it?

Simple case with static menu options:
```javascript
// import
import {ContextMenu} from "./ContextMenu.js";

// create instance
const contextMenu = new ContextMenu();

// add menu options
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");

// append to page element
// note: document.body element will only be as large as its children
document.getElementById("rectangle").appendChild(contextMenu);

// listen for events
contextMenu.addEventListener("click", function(evt) {
    console.log("contextMenu selection: " + contextMenu.selection);
    console.log("contextMenu selected element:", contextMenu.selectedElement);
});
```

More complex case with dynamic menu options or decision making:
```javascript
// create instance with autoDisplay set to false
const contextMenu = new ContextMenu({autoDisplay: false});

// add menu options
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");

// append to page
const rectangleElement = document.getElementById("rectangle");
const squareElement = document.getElementById("square");
rectangleElement.appendChild(contextMenu);

// listen for listen for contextmenu event from page element.
// and show context menu manually based on app logic
rectangleElement.addEventListener("contextmenu", (evt) => {
    let targetElement = evt.target;
    if (targetElement === squareElement) {
        contextMenu.disableItem("Edit");
        contextMenu.show(evt, "Change Color");
    } else {
        contextMenu.show(evt);
    }
});

// listen for user selection as before
contextMenu.addEventListener("click", function(evt) {
    console.log("contextMenu selection: " + contextMenu.selection);
    console.log("contextMenu selected element:", contextMenu.selectedElement);
});
```
