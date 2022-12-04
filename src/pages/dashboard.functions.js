import {storage} from '@core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return `
    <a href="#excel/${id}" class="db__record">
      <p>
        <img src="../images/docs.png" alt="doc" />
        ${model.title}
      </p>
      <span>
        ${new Date(model.createdDate).toLocaleString('ru', options)}
      </span> 
    </a>
  `;
}

function getAllKeys() {
  console.log(1);
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  sortKeys(keys);
  return keys;
}

function sortKeys(keys) {
  keys.sort((a, b) => {
    const itemA = parseInt(a.split(':')[1]);
    const itemB = parseInt(b.split(':')[1]);
    return itemB - itemA;
  });
}

export function createRecordsTable() {
  const keys = getAllKeys();
  sortKeys(keys);

  if (!keys.length) {
    return `<p class="db__empty-text">Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата создания</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
