export function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start];
    }
    return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDashCase(myStr) {
    return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInLineStyles(styles = {}) {
    return Object.keys(styles)
        .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';');
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
