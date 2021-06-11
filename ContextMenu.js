
// ContextMenu. Will display all assigned menuitems automatically if
// autoDisplay option is not set to false

class ContextMenu extends HTMLUListElement {

    constructor(opts = {}) {
        super();

        const defaults = {
            className: "contextMenu",
            autoDisplay: true,
            tabIndex: 0,
            positionedFromParent: false,
        };

        this.className = opts.className !== undefined? opts.className: defaults.className;
        this.autoDisplay = opts.autoDisplay !== undefined? opts.autoDisplay : defaults.autoDisplay;
        this.tabIndex = opts.tabIndex !== undefined? opts.tabIndex : defaults.tabIndex;
        this.positionedFromParent = opts.positionedFromParent !== undefined?
                opts.positionedFromParent : defaults.positionedFromParent;

        this.previousFocusedElement = null;
        this.targetElement = null;
        this.itemSelected = null;
        this.itemDisabled = null;
        this.itemHovered = null;
        this.hidden = true;

        this.itemSelectedEvent = new Event("itemSelected");
        this.itemDisabledEvent = new Event("itemDisabled");
        this.itemHoveredEvent = new Event("itemHovered");

        this.addEventListener("click", (evt) => {
            if (evt.target.tagName === "LI") {
                if (evt.target.getAttribute("disabled")) {
                    this.itemSelected = null;
                    this.itemDisabled = evt.target.innerHTML;
                    this.itemDisabledEvent.value = evt.target.innerText;
                    this.dispatchEvent(this.itemDisabledEvent);
                } else {
                    this.itemDisabled = null;
                    this.itemSelected = evt.target.innerHTML;
                    this.itemSelectedEvent.value = evt.target.innerText;
                    this.dispatchEvent(this.itemSelectedEvent);
                }
                this.hide();
            }
        });

        this.addEventListener("mouseover", (evt) => {
            if (evt.target.tagName === "LI" && this.itemHovered !== evt.target.innerHTML) {
                this.itemHovered = evt.target.innerHTML;
                this.itemHoveredEvent.value = evt.target.textContent;
                this.dispatchEvent(this.itemHoveredEvent);
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
        this.parentElement.addEventListener("contextmenu", (evt) => {
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

        this.removeItemsByClass("special");

        if (specialLineItem) {
            this.addItem(specialLineItem, "special");
        }

        let rect = this.getBoundingClientRect();
        let parentRect = this.parentElement.getBoundingClientRect();
        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;

        if (x + rect.width > sWidth) {
            x -= rect.width;
        }

        if (y + rect.height > sHeight) {
            y -= rect.height;
        }

        if (this.positionedFromParent) {
            this.style.left = x - parentRect.left + "px";
            this.style.top = y - parentRect.top + "px";
        } else {
            this.style.left = x  + "px";
            this.style.top = y + window.scrollY + "px";
        }

        this.hidden = false;
        this.itemHovered = null;
        this.itemSelected = null;
        this.style.display = "block";
        this.targetElement = evt.target;
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
        for (const item of this.children) {
            if (item.textContent === text) {
                return item;
            }
        }
    }

    addItem(name, className) {
        const item = document.createElement("LI");
        item.textContent = name;

        if (typeof className === "string") {
            item.classList.add(className);
        }

        if (className === "special") {
            this.prepend(item);
        } else {
            this.appendChild(item);
        }

        return item;
    }

    removeItem(name) {
        const item = this.findItem(name);
        if (item) {
            this.removeChild(item);
        }
    }

    removeItemsByClass(className) {
        var itemsWithClass = this.querySelectorAll("." + className);
        for (const item of itemsWithClass) {
            this.removeChild(item);
        }
    }

    resetToDefaultItems() {
        this.removeItemsByClass("special");
    }

    enableAllItems() {
        for (const item of this.children) {
            item.removeAttribute("disabled");
        }
    }

    enableItem(name) {
        const item = this.findItem(name);
        if (item) {
            item.removeAttribute("disabled");
        }
    }

    disableItem(name) {
        const item = this.findItem(name);
        if (item) {
            item.setAttribute("disabled", true);
        }
    }
}

customElements.define("context-menu", ContextMenu, {extends: "ul"});

export {ContextMenu};
