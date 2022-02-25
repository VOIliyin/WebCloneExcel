import './scss/index.scss';
import './index.html';
import {Excel} from '@/components/excel/Excel.js';
import {Header} from '@/components/header/Header.js';
import {Toolbar} from '@/components/toolbar/Toolbar.js';
import {Formula} from '@/components/formula/Formula.js';
import {Table} from '@/components/table/Table.js';
import {createStore} from '@core/createStore.js';
import {rootReducer} from './store/rootReducer.js';
import {storage} from '@core/utils.js';
import {initialState} from '@/store/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();
