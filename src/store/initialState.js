import {defaultStyle, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyle,
    stylesState: {},
    title: defaultTitle,
    date: new Date().toJSON
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyle
});

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
