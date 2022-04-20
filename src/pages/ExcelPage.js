import {Page} from '@core/Page';
// import {$} from '@core/dom';
import {Excel} from '@/components/excel/Excel.js';
import {Header} from '@/components/header/Header.js';
import {Toolbar} from '@/components/toolbar/Toolbar.js';
import {Formula} from '@/components/formula/Formula.js';
import {Table} from '@/components/table/Table.js';
import {createStore} from '@core/createStore.js';
import {rootReducer} from '../store/rootReducer.js';
import {storage} from '@core/utils.js';
import {normalizeInitialState} from '@/store/initialState';

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params));
        const store = createStore(rootReducer, normalizeInitialState(state));

        store.subscribe((state) => {
            storage(storageName(this.params), state);
        });

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}

function storageName(param) {
    return 'excel: ' + param;
}
