class Dom {
    constructor(selector) {
        this.$el =
            typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    get text() {
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    set text(text) {
        this.$el.textContent = text;
    }

    clear() {
        this.html('');
        return this;
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.appendChilde(node);
        }
        return this;
    }

    on(eventType, cb) {
        this.$el.addEventListener(eventType, cb);
    }

    off(eventType, cb) {
        this.$el.removeEventListener(eventType, cb);
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    get data() {
        return this.$el.dataset;
    }

    findeAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    css(style = {}) {
        Object.keys(style).forEach((key) => {
            this.$el.style[key] = style[key];
        });
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    focus() {
        this.$el.focus();
        return this;
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            };
        }
        return this.data.id;
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
