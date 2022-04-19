import {$} from '@core/dom.js';
import {Emitter} from '@core/Emitter.js';
import {StoreSubscriber} from '@core/StoreSubscriber.js';

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.emmiter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emmiter,
            store: this.store
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

    init() {
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach((component) => {
            component.init();
        });
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach((component) => component.destroy());
    }
}
