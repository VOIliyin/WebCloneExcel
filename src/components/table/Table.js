import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize.js';
import {
    shooldResize,
    shooldCell,
    createMatrix,
    nextSelector
} from '@/components/table/table.functions.js';
import {TableSelection} from '@/components/table/TableSelection.js';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHtml() {
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.$cell = this.$root.find('[data-id="0:0"]');
        this.selection.select(this.$cell);
        this.selectCell(this.$cell);
        this.$on('formula:input', (text) => {
            this.selection.current.text = text;
        });
        this.$on('formula:Enter', () => {
            this.selection.current.focus();
        });
    }

    onInput(event) {
        this.selectCell($(event.target));
    }

    onMousedown(event) {
        if (shooldResize(event)) {
            resizeHandler(event, this.$root);
        } else if (shooldCell(event)) {
            const $target = $(event.target);

            if (event.shiftKey) {
                const $cells = createMatrix(
                    $target,
                    this.selection.current
                ).map((id) => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown',
            'ArrowUp'
        ];

        const {key} = event;
        console.log(event);
        if (keys.includes(key) && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            console.log(nextSelector(key, id));
            const $next = this.$root.find(nextSelector(key, id));
            this.selection.select($next);
            this.selectCell($next);
        }
    }

    selectCell($cell) {
        this.$emit('table:selected', $cell.text);
    }
}
