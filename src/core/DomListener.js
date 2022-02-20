import {capitalize} from '@core/utils.js';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('no $root');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (!this[method]) {
                const name = this.name || '';
                throw new Error(
                    `Methode ${method} is not implemented in ${name}`
                );
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this.activeListener[listener]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            this.$root.off(listener, this.activeListener[listener]);
        });
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
