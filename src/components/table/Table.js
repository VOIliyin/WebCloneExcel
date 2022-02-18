import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    toHtml() {
        return `
        <div class="excel__row">

        <div class="excel__row-info"></div>

        <div class="excel__row-data">
            <div class="excel__column">A</div>
            <div class="excel__column">B</div>
            <div class="excel__column">C</div>
        </div>

    </div>

    <div class="excel__row">

        <div class="excel__row-info">1</div>

        <div class="excel__row-data">
            <div class="excel__cell selected" contenteditable>asd</div>
            <div class="excel__cell" contenteditable>sdf</div>
            <div class="excel__cell" contenteditable>sdf</div>
        </div>

    </div>

</div>
`;
    }
}
