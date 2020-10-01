
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
        document.dispatchEvent(new MouseEvent("contextmenu", {clientX: 100, clientY: 100}));
        assert.equal(this.cMenu.hidden, false, "expect .hidden to be false");
    });

    QUnit.test("hides on click outside", function(assert) {
        document.dispatchEvent(new MouseEvent("mousedown", {clientX: 100, clientY: 100}));
        assert.equal(this.cMenu.hidden, true, "expect .hidden to be true");
    });

    QUnit.test("adding and removing options", function(assert) {
        this.cMenu.addMenuOption("testOption");
        let menuOption = this.cMenu.menuOptions.children[0];
        assert.equal(menuOption.innerText, "testOption", "testing that menu can add option");

        this.cMenu.removeMenuOption("testOption");
        menuOption = this.cMenu.menuOptions.children[0];
        assert.equal(menuOption, null, "testing that menu can remove option");
    });

    QUnit.test("disabling and enabling an option", function(assert) {
        this.cMenu.addMenuOption("testOption");
        let menuOption = this.cMenu.menuOptions.children[0];
        assert.equal(menuOption.innerText, "testOption", "testing that menu can add option");

        this.cMenu.disableItem("testOption");
        assert.equal(menuOption.getAttribute("disabled"), "true", "testing that menu can disable option");

        this.cMenu.enableAllItems();
        assert.equal(menuOption.getAttribute("disabled"), null, "testing that menu can enable option");
    });

});


