import $ from '@core/dom';
import Page from '@core/Page';
import createRecordsTable from './dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1 class="title">Таблицы</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <h2 class="db__subtitle">Создать таблицу</h2>
          <a href="#excel/${now}" class="db__create">
            <img src="../images/plus.png" alt="new table" />
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `);
  }
}
