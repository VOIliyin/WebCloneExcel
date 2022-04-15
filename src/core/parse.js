import mexp from 'math-expression-evaluator';

export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            return mexp.eval(value.slice(1));
        } catch (e) {
            console.warn('Skipping parse error', e.message);
        }
    }
    return value;
}
