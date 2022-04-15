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
import * as actions from '@/store/actions.js';
import {defaultStyle} from '@/constants.js';
import {parse} from '@core/parse.js';

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
        return createTable(20, this.store.getState());
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
            this.selection.current.attr('data-value', text);
            this.selection.current.text = parse(text);
            this.updateTextInStore(text);
        });
        this.$on('formula:Enter', () => {
            this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(
                actions.applyStyle({
                    value,
                    ids: this.selection.ids
                })
            );
        });
    }

    updateTextInStore(text) {
        this.$dispatch(
            actions.changeText({
                id: this.selection.current.id(),
                value: text
            })
        );
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text);
        this.selection.current.attr('data-value', $(event.target).text);
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this.$root);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn(e.massage);
        }
    }

    onMousedown(event) {
        if (shooldResize(event)) {
            this.resizeTable(event);
        } else if (shooldCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = createMatrix(
                    $target,
                    this.selection.current
                ).map((id) => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.parseCurentCell();
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
        if (keys.includes(key) && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            this.parseCurentCell();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selection.select($next);
            this.selectCell($next);
        }
    }

    selectCell($cell) {
        this.$emit('table:selected', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyle));
        this.$dispatch(actions.changeStyles(styles));
    }

    parseCurentCell() {
        this.selection.current.text = parse(this.selection.current.text);
    }
}
