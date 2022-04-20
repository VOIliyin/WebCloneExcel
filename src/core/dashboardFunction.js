function toHtml() {
    return `
        <li class="db__record">
            <a href="#">dsfgkjdslfgjk</a>
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

        keys.push(key);
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
