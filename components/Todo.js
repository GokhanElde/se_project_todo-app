class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    if (this._data.date) {
      const dateObj = new Date(this._data.date);
      if (!isNaN(dateObj)) {
        this._todoDate.textContent = `Due: ${dateObj.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
