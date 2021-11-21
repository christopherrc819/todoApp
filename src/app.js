document.addEventListener('DOMContentLoaded', () => {

  //Dynamic greeting message
  const welcomeGreeting = document.querySelector('[data-welcome-greeting]');
  const today = new Date();

  function greetingMessage() {
    let todayGreeting;
    const hourNow = today.getHours();
    if (hourNow === 0) {
      todayGreeting = 'Good Midnight';
    } else if (hourNow > 18 && hourNow < 24) {
      todayGreeting = 'Good Evening';
    } else if (hourNow === 18) {
      todayGreeting = 'Good Dinner';
    } else if (hourNow === 12) {
      todayGreeting = 'Happy Noon Time';
    } else if (hourNow > 12 && hourNow < 18) {
      todayGreeting = 'Good Afternoon';
    } else if (hourNow > 0 && hourNow < 12) {
      todayGreeting = 'Grand Rising';
    }
    return todayGreeting;
  }
  welcomeGreeting.innerText = greetingMessage();
  //Display Time
  const timeDisplay = document.querySelector('[data-time]');

  function getTime() {
    const hours = today.getHours();
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    return `${hours}:${minutes}`
  }
  timeDisplay.innerText = getTime()
  //Display date
  const dateDisplayElement = document.querySelector('[data-date-display]')

  function displayDate() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayNumber = today.getDate(); //numerical value
    const day = dayNames[today.getDay()];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    // const msgDate = day + ' ' + dayNumber + ' ' + month + ' ' + year;
    const msgDate = `${dayNumber} ${day} ${month} ${year}`
    return msgDate;
  }
  dateDisplayElement.innerText = displayDate();
  //Name Input section
  const nameForm = document.querySelector('[data-name-form]')
  const inputNameElement = document.querySelector('[data-name-input]')
  const nameSection = document.querySelector('[data-name-section]')
  const nameResetButton = document.querySelector('[data-name-reset]')
  const nameSubmitBtn = document.querySelector('[data-name-submit]')
  const nameDisplay = document.querySelector('[data-name-display]')
  //Check for stored name in localStorage and display name
  function getName() {
    const storedName = JSON.parse(localStorage.getItem('storedName'));
    if (storedName) {
      nameDisplay.innerText = storedName;
      nameForm.style.display = 'none';
      nameResetButton.style.display = 'block';
    } else {
      nameResetButton.style.display = 'none';
    }
  }
  getName() //check for stored Name, gets name and places name nameDisplay div.

  function inputName(name) {
    if (name !== '') {
      {
        name: name
      }
    }
    localStorage.setItem('storedName', JSON.stringify(name))
    getName()
  }

  nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    inputName(inputNameElement.value);
    nameForm.style.display = 'none';
    nameResetButton.style.display = 'block';
  })

  nameResetButton.addEventListener('click', () => {
    localStorage.removeItem('storedName')
    nameDisplay.innerText = '';
    nameForm.style.display = 'block';
    nameResetButton.style.display = 'none';
  })

  // todoInputSection
  const todoInputSection = document.querySelector('[data-todoInputSection]');
  const todoInputForm = document.querySelector('[data-todoInputForm]');
  const todoInputElement = document.querySelector('[data-todoInputElement]');
  const todoListSection = document.querySelector('[data-todoListSection]');
  todoListSection.addEventListener('click', function (e) {
    if (e.target && e.target.matches('div.completed')) {
      console.log('list item');
    }
  })
  let todoArray = [];

  function addTodo(item) {
    if (item !== '') {
      const todoItem = {
        id: Date.now(),
        task: item,
        completed: false
      };
      todoArray.push(todoItem);
      addToLocalStorage(todoArray);
      todoInputElement.value = '';
    }
  }

  function addToLocalStorage(addArray) {
    localStorage.setItem('todoList', JSON.stringify(addArray));
    getFromLocalStorage();
  }

  function getFromLocalStorage() {
    const storedTodoItems = localStorage.getItem('todoList')
    if (storedTodoItems) {
      todoArray = JSON.parse(storedTodoItems);
      console.log(JSON.parse(storedTodoItems));
    }
    renderTodos(todoArray)
  }
  getFromLocalStorage();

  function renderTodos(todoList) {
    todoListSection.innerHTML = '';
    todoArray.forEach(todoList => {
      const listItem = document.createElement('LI');
      listItem.setAttribute('data-id', todoList.id);
      listItem.setAttribute('class', 'todoItem');
      if (todoList.completed === true) {
        listItem.innerHTML = `
        <div data-todoItemCompleted class='completed greenFilter' >
          <img src="fontAwesome/check-circle-solid.svg" alt="checkMark">
        </div>
        <div data-todoItemDisplay class='todoItemDisplay'>
            ${todoList.task}
        </div>
        <div data-deleteItem class='deleteItem redFilter'>
          <img src="fontAwesome/minus-circle-solid.svg" alt="deleteItem">
        </div>
        `
      } else if (todoList.completed === false) {
        listItem.innerHTML = `
        <div data-todoItemCompleted class='completed greyFilter' >
          <img src="fontAwesome/check-circle-regular.svg" alt="checkMark">
        </div>
        <div data-todoItemDisplay class='todoItemDisplay'>
            ${todoList.task}
        </div>
        <div data-deleteItem class='deleteItem redFilter'>
          <img src="fontAwesome/minus-circle-solid.svg" alt="deleteItem">
        </div>
        `
      }

      todoListSection.appendChild(listItem);
    })
    // const todoItemCompleted = document.querySelector('[data-todoItemCompleted]')
    //
    // function test() {
    //   console.log('working')
    // }
    //
    // todoItemCompleted.forEach(item => {
    //   item.addEventListener('click', test)
    // })
    // console.log(todoItemCompleted)
  }

  todoInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo(todoInputElement.value);
  })
  // renderTodos(todos) {
  //
  // }
  // addToLocalStorage(todos) {
  //
  // }
  // getFromLocalStorage() {
  //
  // }
  // toggle(id) {
  //
  // }
  // deleteTodo(id) {
  //
  // }
  //submit but with event listenser
  //Day Greeting + User Input name
  //Date Display
})
