class TodoCounter {
  constructor(todos = [], selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((t) => t.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted(increment) {
    if (increment === true) {
      this._completed = this._completed + 1;
    } else {
      this._completed = this._completed - 1;
    }
    this._updateText();
  }

  updateTotal(increment) {
    if (increment === true) {
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
