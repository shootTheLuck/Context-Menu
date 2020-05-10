# Custom HTML5 Context Menu ...

## Simple case usage with static menu options:
```javascript
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
create instance with option autoDisplay set to false
```javascript
var contextMenu = new ContextMenu({autoDisplay: false});
```
add menu options
```javascript
contextMenu.addMenuOption("Edit");
contextMenu.addMenuOption("Back");
contextMenu.addMenuOption("Create");
```
append to page
```javascript
rectangleElement.appendChild(contextMenu);
```
listen for rightClick event and show context menu manually based on app logic
```javascript
contextMenu.addEventListener("rightClick", function(evt) {
    let targetElement = evt.detail.value.target;
    if (targetElement === squareElement) {
        contextMenu.show(evt.detail.value, "Change Color");
    } else {
        contextMenu.show(evt.detail.value);
    }
});
```
listen for user selection as before
```javascript
contextMenu.addEventListener("selection", function(evt) {
    let selectedValue = evt.detail.value;
    let targetElement = evt.detail.initialClick.target;
    console.log("contextMenu selection:", selectedValue);
    console.log("contextMenu original target:", targetElement);
});

```
