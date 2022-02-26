import {ExcelComponent} from '@core/ExcelComponent.js';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    get template() {
        return JSON.stringify(this.state, null, 2);
    }

    initState(state = {}) {
        this.state = {...state};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.$root.html(this.template);
    }
}
