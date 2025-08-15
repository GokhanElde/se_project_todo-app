import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const el = generateTodo(item);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const counter = new TodoCounter(initialTodos, ".counter__text");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const date = values.date ? new Date(values.date) : null;
    if (date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const todoValues = {
      name: values.name,
      date,
      id: uuidv4(),
      completed: false,
    };

    section.addItem(generateTodo(todoValues));
    counter.updateTotal(true);
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addTodoPopup.open());

const todosList = document.querySelector(".todos__list");

todosList.addEventListener("change", (e) => {
  if (e.target.classList.contains("todo__completed")) {
    counter.updateCompleted(e.target.checked);
  }
});

todosList.addEventListener("click", (e) => {
  const delBtn = e.target.closest(".todo__delete-btn");
  if (!delBtn) return;
  const li = delBtn.closest(".todo");
  const wasCompleted = li?.querySelector(".todo__completed")?.checked;
  if (wasCompleted) counter.updateCompleted(false);
  li.remove();
  counter.updateTotal(false);
});
