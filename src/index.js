import './scss/index.scss';
import './index.html';
import {Excel} from '@/components/excel/Excel.js';
import {Header} from '@/components/header/Header.js';
import {Toolbar} from '@/components/toolbar/Toolbar.js';
import {Formula} from '@/components/formula/Formula.js';
import {Table} from '@/components/table/Table.js';

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
});

excel.render();
