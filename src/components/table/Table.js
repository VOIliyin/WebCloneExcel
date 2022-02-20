import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template.js';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    toHtml() {
        return createTable();
    }
}
