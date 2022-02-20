const CODES = {
    A: 65,
    Z: 90
};

function createCell() {
    return `
    <div class="excel__cell" contenteditable></div>
    `;
}

function createCol(content) {
    return `
    <div class="excel__column">${content}</div>
    `;
}

function createRow(content, info = '') {
    return `
    <div class="excel__row">
        <div class="excel__row-info">${info}</div>        
        <div class="excel__row-data">${content}</div>        
    </div>`;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('');

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill('').map(createCell).join('');
        rows.push(createRow(cells, i + 1));
    }

    return rows.join('');
}
