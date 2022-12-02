import {range} from '@core/utils';
import {MAX_ROW_COUNTS, MAX_COLS_COUNTS} from './table.template';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

/* eslint-disable indent*/
export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      if (row < MAX_ROW_COUNTS - 1) {
        row++;
      }
      break;
    case 'Tab':
    case 'ArrowRight':
      if (col < MAX_COLS_COUNTS - 1) {
        col++;
      }
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
/* eslint-enable indent*/
