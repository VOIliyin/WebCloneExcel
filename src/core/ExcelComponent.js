import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emitter;
        this.unsubscribes = [];

        this.prepare();
    }

    prepare() {}

    toHtml() {
        return '';
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribes.forEach((unsub) => unsub());
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, cb) {
        const unsub = this.emitter.subscribe(event, cb);
        this.unsubscribes.push(unsub);
    }
}
