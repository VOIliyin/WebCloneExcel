import {ExcelStateComponent} from '@core/ExcelStateComponent.js';
import {$} from '@core/dom.js';
import {changeTitle} from '@/store/actions.js';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
                        <div class="excel__button" data-button="logout">
                            <span class="material-icons" data-button="logout">
                                logout
                            </span>
                        </div>
                        
                        <div class="excel__button" data-button="delete">
                            <span class="material-icons" data-button="delete">
                                delete
                            </span>
                        </div>
                    </div>
        `;
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.button === 'logout') {
            ActiveRoute.path = '';
        } else if ($target.data.button === 'delete') {
            const decision = confirm(
                'Вы действительно хотите удалить таблицу?'
            );

            if (decision) {
                localStorage.removeItem('excel: ' + ActiveRoute.param);
                ActiveRoute.path = '';
            }
        }
    }
}
