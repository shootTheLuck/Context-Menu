
import {ContextMenu} from "../ContextMenu.js";

QUnit.test( "testing QUnit", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.module("Context Menu", function(hooks) {
    hooks.beforeEach(function() {
        this.cMenu = new ContextMenu();
        document.body.appendChild(this.cMenu);
    });

    QUnit.test("instantiates and appends to DOM", function(assert) {
        this.cMenu.id = "contextMenuTest";
        var tMenu = document.getElementById("contextMenuTest");
        assert.ok(tMenu);
    });

    QUnit.test("hides with escape key", function(assert) {
        document.dispatchEvent(new KeyboardEvent("contextmenu", {key: "Escape"}));
        assert.equal(this.cMenu.hidden, true, "expect .hidden to be true");
    });

    QUnit.test("shows upon right click", function(assert) {
        document.body.dispatchEvent(new MouseEvent("contextmenu", {clientX: 100, clientY: 100}));
        assert.equal(this.cMenu.hidden, false, "expect .hidden to be false");
    });

    QUnit.test("hides on click outside", function(assert) {
        document.body.dispatchEvent(new MouseEvent("mousedown", {clientX: 100, clientY: 100}));
        assert.equal(this.cMenu.hidden, true, "expect .hidden to be true");
    });

    QUnit.test("adding and removing items", function(assert) {
        this.cMenu.addItem("testOption");
        let menuItem = this.cMenu.children[0];
        assert.equal(menuItem.innerText, "testOption", "testing that menu can add item");

        this.cMenu.removeItem("testOption");
        menuItem = this.cMenu.children[0];
        assert.equal(menuItem, null, "testing that menu can remove item");
    });

    QUnit.test("disabling and enabling an item", function(assert) {
        this.cMenu.addItem("testOption");
        let menuItem = this.cMenu.children[0];
        assert.equal(menuItem.innerText, "testOption", "testing that menu can add item");

        this.cMenu.disableItem("testOption");
        assert.equal(menuItem.getAttribute("disabled"), "true", "testing that menu can find and disable item");

        this.cMenu.enableAllItems();
        assert.equal(menuItem.getAttribute("disabled"), null, "testing that menu can enable item");
    });

});


