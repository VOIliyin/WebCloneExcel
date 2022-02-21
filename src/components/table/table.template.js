const CODES = {
    A: 65,
    Z: 90
};

function createCell(_, index) {
    return `
    <div class="excel__cell" contenteditable data-col="${index}"></div>
    `;
}

function createCol(content, index) {
    return `
    <div class="excel__column" data-type="resizable" data-col="${index}">
        ${content}
        <div class="excel__col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(content, info = '') {
    return `
    <div class="excel__row" data-type="resizable">
        <div class="excel__row-info">
        ${info}
        ${info ? '<div class="excel__row-resize" data-resize="row"></div>' : ''}
        </div>        
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
