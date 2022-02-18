import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHtml() {
        return `<div class="excel__formula-info">FX</div>
        <div class="excel__formula-input" contenteditable></div>`;
    }

    onInput(event) {
        console.log('onInput Formuls', event.target.textContent.trim());
    }

    onClick() {}
}
