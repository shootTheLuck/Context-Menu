
// TODO: assign all opts at top

// ContextMenu.  Will display all assigned menuitems automatically if
// autoDisplay is not set to false

class ContextMenu extends HTMLElement {

    constructor(opts = {}) {
        super();

        this.rightClickEvent = new CustomEvent("rightClick", {
            detail: {value: null},
        });

        this.selectionEvent = new CustomEvent("selection", {
            detail: {value: null},
        });

        this.className = "context-menu";

        this.menuOptions = document.createElement("UL");
        this.menuOptions.className = "context-menu-options";
        this.appendChild(this.menuOptions);

        this.previousFocusedElement = document.activeElement;
        this.autoDisplay =
                (opts.autoDisplay !== undefined) ? opts.autoDisplay : true;

        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                this.hide();
            }
        });

        document.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
            this.rightClickEvent.detail.value = evt;
            this.dispatchEvent(this.rightClickEvent);
            if (this.autoDisplay) {
                this.show(evt);
            }
        });

        this.menuOptions.addEventListener("mousedown", (evt) => {
            evt.stopPropagation();
            // document.removeEventListener("mousedown", this.outsideClickHandler);
        });

        this.menuOptions.addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.target.tagName === "LI"&& !evt.target.getAttribute("disabled")) {
                var selectedValue = evt.target.innerHTML;
                this.selectionEvent.detail.value = selectedValue;
                this.selectionEvent.detail.initialClick = this.rightClickEvent.detail.value;
                this.dispatchEvent(this.selectionEvent);
                this.hide();
            }
        });

        this.hidden = true;
        this.outsideClickHandler = this.handleOutsideClick.bind(this);

        this.tabIndex = opts.tabIndex || 0;
    }

    handleOutsideClick(evt) {
        if (evt.target !== this.menuOptions) {
            this.hide();
        }
    }

    show(evt, specialLineItem) {
        // this.rightClickEvent.detail.click = evt;
        // this.dispatchEvent(this.rightClickEvent);

        let rect = this.parentElement.getBoundingClientRect();
        let x = evt.clientX;
        let y = evt.clientY;
        if (x > rect.left && x < rect.right &&
            y > rect.top && y < rect.bottom) {
            evt.preventDefault();
            evt.stopPropagation();

            this.removeMenuOptionByClass("special");
            this.hidden = false;
            this.style.display = "block";
            this.style.left = x - rect.left + "px";
            this.style.top = y - rect.top + "px";
            if (specialLineItem) {
                this.addMenuOption(specialLineItem, "special");
            }
            document.addEventListener("mousedown", this.outsideClickHandler);
            this.previousFocusedElement = document.activeElement;
            this.focus();
        }
    }

    hide() {
        this.hidden = true;
        this.style.display = "none";
        this.enableAllItems();
        document.removeEventListener("mousedown", this.outsideClickHandler);
        this.previousFocusedElement.focus();
    }

    findMenuOption(text) {
        for (let i = 0; i < this.menuOptions.children.length; i++) {
            let child = this.menuOptions.children[i];
            if (child.textContent === text) {
                return child;
            }
        }
    }

    addMenuOption(name, className) {
        var newElement = document.createElement("LI");
        newElement.textContent = name;

        if (typeof className === "string") {
            newElement.classList.add(className);
        }

        if (className === "special") {
            this.menuOptions.prepend(newElement);
        } else {
            this.menuOptions.appendChild(newElement);
        }
        return newElement;
    }

    removeMenuOption(name) {
        let menuItem = this.findMenuOption(name);
        if (menuItem) {
            this.menuOptions.removeChild(menuItem);
        }
    }

    removeMenuOptionByClass(className) {
        var elements = this.querySelectorAll("." + className);
        for (let i = elements.length; i--;) {
            this.menuOptions.removeChild(elements[i]);
        }
    }

    resetToDefaultLineItems() {
        this.removeMenuOptionByClass("special");
    }

    enableAllItems() {
        for (let i = 0; i < this.menuOptions.children.length; i++) {
            let child = this.menuOptions.children[i];
            child.removeAttribute("disabled");
        }
    }

    disableItem(name) {
        let menuItem = this.findMenuOption(name);
        if (menuItem) {
            // menuItem.toggleAttribute("disabled");
            menuItem.setAttribute('disabled', true)
        }
    }
}

customElements.define("context-menu", ContextMenu);

export {ContextMenu};
