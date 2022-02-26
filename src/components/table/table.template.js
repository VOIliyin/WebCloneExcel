import {toInLineStyles} from '@core/utils.js';
import {defaultStyle} from '@/constants.js';

const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(row, index, state) {
    const value = state.dataState[`${row}:${index}`];
    const styles = state.stylesState[`${row}:${index}`];
    return `
    <div 
        class="excel__cell" 
        contenteditable 
        data-col="${index}" 
        data-id="${row}:${index}"
        data-type="cell"
        style="${toInLineStyles({...defaultStyle, ...styles})};
        width: ${getWidth(state.colState, index)}"
    >
        ${value || ''}
    </div>
    `;
}

function createCol({content, index, width}) {
    return `
    <div 
        class="excel__column" 
        data-type="resizable" 
        data-col="${index}"
        style="width: ${width}"
    >
        ${content}
        <div class="excel__col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(content, info = '', index, state) {
    const height = getHeight(state, index);
    return `
    <div 
        class="excel__row" 
        data-type="resizable" 
        data-row="${index}" 
        style="height: ${height}"
    >
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

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function withWidthFrom(state) {
    return function _(content, index) {
        return {
            content,
            index,
            width: getWidth(state.colState, index)
        };
    };
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

export function createTable(rowsCount = 20, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createCol)
        .join('');

    rows.push(createRow(cols, '', null, {}));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map((_, index) => createCell(row, index, state))
            .join('');
        rows.push(createRow(cells, row + 1, row, state.rowState));
    }

    return rows.join('');
}
