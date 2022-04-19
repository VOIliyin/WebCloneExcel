import {Page} from '@core/Page';
import {$} from '@core/dom';

export class DashboardPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
            <div class="db__header">
            <h1>Excel Dashboard</h1>
            </div>

            <div class="db__new">
                <div class="db__view">
                    <a href="#" class="db__create">
                        Новая <br/> таблица
                    </a>
                </div>

            </div>

            <div class="db__table db__view">

                <div class="db__list-header">
                    <span>Название</span>
                    <span>Дата открытия</span>
                </div>

                <div class="db__list">

                    <li class="db__record">
                        <a href="#">dsfgkjdslfgjk</a>
                        <strong>12.04.3022</strong>
                    </li>

                    <li class="db__record">
                        <a href="#">dsfgkjdslfgjk</a>
                        <strong>12.04.3022</strong>
                    </li>

                </div>
            </div>
        `);
    }
}
