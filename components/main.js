import { FormValidator } from "./FormValidator.js";
import { TodoCounter } from "./components/TodoCounter.js";
import { Section } from "./components/Section.js";
import { Todo } from "./components/Todo.js";
import { initialTodos } from "./constants.js";
import { PopupWithForm } from "./PopupWithForm.js";

// Function to handle form submission
function handleTodoFormSubmit(data) {
  console.log("Form submitted with data:", data);
  // You would normally create a new todo here based on form input
}

const todoFormPopup = new PopupWithForm(".todo-popup", handleTodoFormSubmit);

// Open the popup when needed
todoFormPopup.open();


const form = document.querySelector(".todo-form");
const validator = new FormValidator(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validator.validate()) {
    // Proceed with form submission logic
  }
});

// Create a TodoCounter instance
const todoCounter = new TodoCounter(".total-count", ".incomplete-count");

// Create a Section instance
const section = new Section({
  items: [], // Will be populated later
  renderer: (todo) => {
    section.addItem(todo.getView()); // Render each todo
    todoCounter.addTodo(todo); // Add to the counter
  },
  containerSelector: ".todos-container",
});

// Create the PopupWithForm instance for adding new todos
const popupWithForm = new PopupWithForm("#popup-form", (inputData) => {
  const newTodo = new Todo(inputData, "#todo-template");
  section.addItem(newTodo.getView()); // Add the new todo to the section
  todoCounter.addTodo(newTodo); // Update the counter with the new todo
});

// Set event listeners for the form and popups
popupWithForm.setEventListeners();

// Example: Adding initial todos
const initialTodos = [
  { title: "Learn JavaScript", description: "Study ES6+ features" },
  { title: "Build Project", description: "Create a todo app" },
];

initialTodos.forEach((todoData) => {
  const todo = new Todo(todoData, "#todo-template");
  section.addItem(todo.getView());
  todoCounter.addTodo(todo); // Update counter
});
