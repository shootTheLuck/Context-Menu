# Custom HTML5 Context Menu ...

## Simple case usage with static menu options:

```
// create instance
var contextMenu = new ContextMenu();

// add menu options
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");

// append to page
rectangleElement.appendChild(contextMenu);

// listen for events
contextMenu.addEventListener("selection", function(evt) {
    let selectedValue = evt.detail.value;
    let targetElement = evt.detail.initialClick.target;
    console.log("contextMenu selection:", selectedValue);
    console.log("contextMenu original target:", targetElement);
});

```

## More complex case with dynamic menu options or decision making:
```
// create instance with option autoDisplay set to false
var contextMenu = new ContextMenu({autoDisplay: false});

// add menu options
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");

// append to page
rectangleElement.appendChild(contextMenu);

// listen for rightClick event and show context menu based on app logic;
contextMenu.addEventListener("rightClick", function(evt) {
    let targetElement = evt.detail.value.target;
    console.log("contextMenu right click on html target:", targetElement);
    if (targetElement === squareElement) {
        contextMenu.show(evt.detail.value, "Change Color");
    } else {
        contextMenu.show(evt.detail.value);
    }
});

// listen for user selection
contextMenu.addEventListener("selection", function(evt) {
    let selectedValue = evt.detail.value;
    let targetElement = evt.detail.initialClick.target;
    console.log("contextMenu selection:", selectedValue);
    console.log("contextMenu original target:", targetElement);
});

```
