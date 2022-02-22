import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    init() {
        super.init();
        const $formula = this.$root.find('[data-input="formula"]');

        this.$on('table:selected', (text) => {
            $formula.text = text;
        });
    }

    toHtml() {
        return `
            <div class="excel__formula-info">FX</div>
            <div 
                class="excel__formula-input" 
                contenteditable 
                data-input="formula"
            >
            </div>
        `;
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text);
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:Enter');
        }
    }
}
