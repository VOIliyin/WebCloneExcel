import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
// import {$} from '@core/dom';
import {resizeHandler} from '@/components/table/table.resize.js';
import {shooldResize} from '@/components/table/table.functions.js';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHtml() {
        return createTable();
    }

    onMousedown(event) {
        if (shooldResize(event)) {
            resizeHandler(event, this.$root);
        }
    }

    onMousemove(event) {
        console.log(event);
    }

    onMouseup(event) {
        console.log(event);
    }
}
