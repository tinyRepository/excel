import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  toHTML() {
    return ` <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
  }
}
