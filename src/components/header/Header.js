import {ExcelStateComponent} from '@core/ExcelStateComponent.js';
import {$} from '@core/dom.js';
import {changeTitle} from '@/store/actions.js';

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text));
    }

    toHtml() {
        const title = this.store.getState().title;
        return `
            <input type="text" class="excel__input-title" value="${title}">

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
