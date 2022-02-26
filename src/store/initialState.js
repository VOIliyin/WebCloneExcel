import {storage} from '@core/utils.js';
import {defaultStyle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyle,
    stylesState: {}
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyle
});

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState;
