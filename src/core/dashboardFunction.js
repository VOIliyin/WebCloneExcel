import {storage} from '@core/utils.js';

function toHtml(params) {
    return `
        <li class="db__record">
            <a href="#excel/${params.key}">${params.state.title}</a>
            <strong>12.04.3022</strong>
        </li>
    `;
}

function getAllKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key.includes('excel')) {
            continue;
        }

        const state = storage(key);
        console.log(key.split(' ')[1]);
        keys.push({state, key: key.split(' ')[1]});
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (keys.length === 0) {
        return `<p class="db__empty">Вы пока не создали таблицы</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <div class="db__list">
            ${keys.map(toHtml).join('')}
        </div>
    `;
}
