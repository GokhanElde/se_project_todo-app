class TodoCounter {
  constructor(todos = [], selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((t) => t.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(isIncrement) {
    if (isIncrement) {
      this._completed = this._completed + 1;
    } else {
      this._completed = this._completed - 1;
    }
    this._updateText();
  }

  updateTotal(isIncrement) {
    if (isIncrement) {
      this._total = this._total + 1;
    } else {
      this._total = this._total - 1;
    }
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
