import {storage} from '@core/utils.js';
import {defaultStyle, defaultTitle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyle,
    stylesState: {},
    title: defaultTitle
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyle
});

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState;
