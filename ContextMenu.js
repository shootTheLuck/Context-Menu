
// TODO: assign all opts at top

class ContextMenu extends HTMLElement {

    constructor(opts = {}) {
        super();
        this.event = new CustomEvent("selection", {detail: {value: null}});
        this.className = "context-menu";

        this.menuOptions = document.createElement("UL");
        this.menuOptions.className = "context-menu-options";
        this.appendChild(this.menuOptions);

        this.previousFocusedElement = document.activeElement;
        this.handleMouseEvents =
                (opts.handleMouseEvents !== undefined) ? opts.handleMouseEvents : true;

        document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape") {
                this.hide();
            }
        });

        document.addEventListener("contextmenu", (evt) => {
            if (this.handleMouseEvents) {
                this.show(evt);
            }
        });

        this.menuOptions.addEventListener("mousedown", (evt) => {
            evt.stopPropagation();
            document.removeEventListener("mousedown", this.outsideClickHandler);
        });

        this.menuOptions.addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.target.tagName === "LI") {
                var selectedValue = evt.target.innerHTML;
                this.event.detail.value = selectedValue;
                this.dispatchEvent(this.event);
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
            child.classList.remove("disabled");
        }
    }

    disableItem(name) {
        let menuItem = this.findMenuOption(name);
        if (menuItem) {
            menuItem.classList.toggle("disabled");
        }
    }
}

customElements.define("context-menu", ContextMenu);

export default ContextMenu;
