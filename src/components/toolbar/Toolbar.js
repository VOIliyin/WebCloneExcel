import {ExcelStateComponent} from '@core/ExcelStateComponent.js';
import {createToolbar} from './toolbar.template.js';
import {defaultStyle} from '@/constants.js';
import {$} from '@core/dom.js';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyle);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHtml() {
        return this.template;
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);

            this.$emit('toolbar:applyStyle', value);
        }
    }

    storeChanged(change) {
        this.setState(change.currentStyles);
    }
}
