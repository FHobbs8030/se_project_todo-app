class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = this._countCompleted(todos);
    this._total = todos.length;
    this._updateText();
  }

  _countCompleted(todos) {
    return todos.filter((todo) => todo.completed).length;
  }

  _updateText() {
    this._element.textContent = `${this._completed} of ${this._total} todos completed`;
  }

  addTodo() {
    this._total++;
    this._updateText();
  }

  removeTodo(isCompleted) {
    this._total--;
    if (isCompleted) {
      this._completed--;
    }
    this._updateText();
  }

  updateCompleted(isCompleted) {
    this._completed += isCompleted ? 1 : -1;
    this._updateText();
  }
}

export default TodoCounter;
