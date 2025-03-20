class Section {
  constructor({ items, renderer, containerSelector }) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      throw new Error("Container not found");
    }

    this._setEventListeners(); // Attach the event listeners once when the Section is created
  }

  // Method to render multiple items
  renderItems() {
    // Clear previous items
    this.container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    this.items.forEach((item) => {
      this.renderer(item, fragment); // Use the renderer function to add items
    });
    this.container.appendChild(fragment);
  }

  // Method to add a single item
  addItem(item) {
    const fragment = document.createDocumentFragment();
    this.renderer(item, fragment); // Reuse the renderer function
    this.container.appendChild(fragment);
  }

  // Method to set event listeners
  _setEventListeners() {
    // Event delegation: Add event listener on the parent container
    this.container.addEventListener("click", (e) => {
      const target = e.target;

      // Handle delete button click
      if (target.classList.contains("todo-delete")) {
        this._deleteItem(e);
      }

      // Handle checkbox click
      if (target.classList.contains("todo-complete")) {
        this._toggleComplete(e);
      }
    });
  }

  // Delete item logic
  _deleteItem(event) {
    const item = event.target.closest(".todo-item");
    item.remove(); // Remove from DOM

    // Emit custom event for deletion
    const deleteEvent = new CustomEvent("todoDeleted", {
      detail: { data: item.dataset.todoData },
    });
    this.container.dispatchEvent(deleteEvent);
  }

  // Toggle completion logic
  _toggleComplete(event) {
    const item = event.target.closest(".todo-item");
    const isComplete = event.target.checked;
    this._applyCompletionStyle(item, isComplete);

    // Update the item's data (use dataset to access stored data)
    item.dataset.todoData.isComplete = isComplete;

    // Emit custom event for completion
    const completeEvent = new CustomEvent("todoCompleted", {
      detail: { item, isComplete },
    });
    this.container.dispatchEvent(completeEvent);
  }

  // Method to apply completion style to a todo
  _applyCompletionStyle(item, isComplete) {
    if (isComplete) {
      item.classList.add("completed");
    } else {
      item.classList.remove("completed");
    }
  }
}
