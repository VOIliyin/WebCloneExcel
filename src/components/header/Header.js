import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: [],
            ...options
        });
    }

    toHtml() {
        return `
            <input type="text" class="excel__input-title" value="Новая таблица">

                    <div>
                        <div class="excel__button">
                            <span class="material-icons">
                                logout
                            </span>
                        </div>
                        
                        <div class="excel__button">
                            <span class="material-icons">
                                delete
                            </span>
                        </div>
                    </div>
        `;
    }
}
