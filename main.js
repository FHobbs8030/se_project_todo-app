import { initialTodos } from "./constants.js";
import Section from "./components/Section.js";
import Todo from "./components/Todo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import TodoCounter from "./components/TodoCounter.js";

const section = new Section({
  items: initialTodos,
  renderer: (item, fragment) => {
    const todo = new Todo(item, "#todo-template");
    fragment.appendChild(todo.getView());
  },
  containerSelector: ".todos-container",
});

section.renderItems();

const todoCounter = new TodoCounter(initialTodos, "#todo-counter");

const todoFormPopup = new PopupWithForm("#popup-form", (inputData) => {
  const newTodo = new Todo(inputData, "#todo-template");
  section.addItem(newTodo.getView());
  todoCounter.addTodo();
});

todoFormPopup.setEventListeners();
