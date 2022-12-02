const CODES = {
  A: 65,
  Z: 90,
};

export const MAX_ROW_COUNTS = 20;
export const MAX_COLS_COUNTS = CODES.Z - CODES.A + 1;

function toCell(row) {
  return (_, col) => {
    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
      >
      </div>
    `;
  };
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = MAX_ROW_COUNTS) {
  const rows = [];

  const cols = new Array(MAX_COLS_COUNTS).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow('', cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(MAX_COLS_COUNTS).fill('').map(toCell(row)).join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
