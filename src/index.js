import './scss/index.scss';
import './index.html';
import {Router} from '@core/routes/Router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';

const routes = {
    excel: ExcelPage,
    dasboard: DashboardPage
};

const router = new Router('#app', routes);
console.log(router);
