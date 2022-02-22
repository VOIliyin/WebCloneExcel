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
