import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const counter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    onCompletedChange: (isCompleted) => {
      counter.updateCompleted(isCompleted);
    },
    onDelete: (wasCompleted) => {
      if (wasCompleted) counter.updateCompleted(false);
      counter.updateTotal(false);
    },
  });
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

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
    renderTodo(todoValues);
    counter.updateTotal(true);
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addTodoPopup.open());
