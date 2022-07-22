Drag and Drop Event Listener
todoListSection.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(e.clientY);
  const currentlyDragging = document.querySelector('.dragging')
  if (afterElement == null) {
    todoListSection.appendChild(currentlyDragging);
  } else {
    todoListSection.insertBefore(currentlyDragging, afterElement);
  }
  // localStorage.removeItem('todoList');
  const getAllElements = [...todoListSection.querySelectorAll('.todoListSection li')]
  getAllElements.forEach(item => {
    const getTask = item.textContent;
    const getId = item.getAttribute('data-id')
    const getCompleted = item.getAttribute('completed')
  })
})

function getDragAfterElement(y) {
  const draggableElements = [...todoListSection.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      }
    } else {
      return closest
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element
}
