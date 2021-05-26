
// ContextMenu.  Will display all assigned menuitems automatically if
// autoDisplay option is not set to false

class ContextMenu extends HTMLUListElement {

    constructor(opts = {}) {
        super();

        const defaults = {
            className: "contextMenu",
            autoDisplay: true,
            tabIndex: 0
        };

        this.className = opts.className !== undefined? opts.className: defaults.className;
        this.autoDisplay = opts.autoDisplay !== undefined? opts.autoDisplay : defaults.autoDisplay;
        this.tabIndex = opts.tabIndex !== undefined? opts.tabIndex : defaults.tabIndex;

        this.previousFocusedElement = null;
        this.selectedElement = null;
        this.selection = null;
        this.selectionDisabled = null;
        this.hidden = true;
        this.selectionEvent = new Event("selection");

        this.addEventListener("click", (evt) => {
            if (evt.target.tagName === "LI") {
                if (evt.target.getAttribute("disabled")) {
                    this.selectionDisabled = evt.target.innerHTML;
                } else {
                    this.selection = evt.target.innerHTML;
                    this.selectionDisabled = null;
                }
                this.dispatchEvent(this.selectionEvent);
                this.hide();
            }
        });

        this.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
        });

        this.addEventListener("focusout", (evt) => {
            this.hide();
        });

    }

    connectedCallback() {
        document.body.addEventListener("contextmenu", (evt) => {
            if (this.autoDisplay) {
                this.show(evt);
            }
        });

        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                this.hide();
            }
        });
    }

    show(evt, specialLineItem) {

        evt.preventDefault();
        evt.stopPropagation();
        let x = evt.clientX;
        let y = evt.clientY;

        this.removeItemByClass("special");

        if (specialLineItem) {
            this.addItem(specialLineItem, "special");
        }

        this.hidden = false;
        this.selection = null;
        this.style.display = "block";

        let rect = this.getBoundingClientRect();
        let parentRect = this.parentElement.getBoundingClientRect();
        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;

        if (x + rect.width > sWidth) {
            x -= rect.width;
        }
        this.style.left = x - parentRect.left + "px";

        if (y + rect.height > sHeight) {
            y -= rect.height;
        }
        this.style.top = y - parentRect.top + "px";

        this.selectedElement = evt.target;
        this.previousFocusedElement = document.activeElement;
        this.focus();
    }

    hide() {
        this.hidden = true;
        this.style.display = "none";
        this.enableAllItems();

        if (this.previousFocusedElement) {
            this.previousFocusedElement.focus();
        }
    }

    findItem(text) {
        for (const child of this.children) {
            if (child.textContent === text) {
                return child;
            }
        }
    }

    addItem(name, className) {
        var newElement = document.createElement("LI");
        newElement.textContent = name;

        if (typeof className === "string") {
            newElement.classList.add(className);
        }

        if (className === "special") {
            this.prepend(newElement);
        } else {
            this.appendChild(newElement);
        }
        return newElement;
    }

    removeItem(name) {
        let menuItem = this.findItem(name);
        if (menuItem) {
            this.removeChild(menuItem);
        }
    }

    removeItemByClass(className) {
        var elements = this.querySelectorAll("." + className);
        for (let i = elements.length; i--;) {
            this.removeChild(elements[i]);
        }
    }

    resetToDefaultItems() {
        this.removeItemByClass("special");
    }

    enableAllItems() {
        for (const child of this.children) {
            child.removeAttribute("disabled");
        }
    }

    enableItem(name) {
        let menuItem = this.findItem(name);
        if (menuItem) {
            menuItem.removeAttribute("disabled");
        }
    }

    disableItem(name) {
        let menuItem = this.findItem(name);
        if (menuItem) {
            menuItem.setAttribute("disabled", true);
        }
    }
}

customElements.define("context-menu", ContextMenu, {extends: "ul"});

export {ContextMenu};
