import {$} from '@core/dom.js';
import {Emitter} from '@core/Emitter.js';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emmiter = new Emitter();
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emmiter
        };

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);
            $el.html(component.toHtml());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach((component) => {
            component.init();
        });
    }

    destroy() {
        this.components.forEach((component) => component.destroy());
    }
}
