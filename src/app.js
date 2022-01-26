document.addEventListener('DOMContentLoaded', () => {
  //Todo data
  const todoInputSection = document.querySelector('[data-todoInputSection]');
  const todoInputForm = document.querySelector('[data-todoInputForm]');
  const todoInputElement = document.querySelector('[data-todoInputElement]');
  const todoListSection = document.querySelector('[data-todoListSection]');

  const lightModeBtn = document.querySelector('[data-lightModeBtn]')
  const todoApp = document.querySelector('[data-todoApp]')
  const inputBtn = document.querySelector('[data-inputBtn]')

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
  let todoArray = [];

  todoInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo(todoInputElement.value);
  })

  //Input Task Function
  function addTodo(item) {
    if (item !== '') {
      const todoItem = {
        id: Date.now(),
        task: item,
        completed: false
      };
      //Add item to current array.
      todoArray.push(todoItem);
      //pass in total array into local storage via function.
      addToLocalStorage(todoArray);
      //Clear inputed value in form.
      todoInputElement.value = '';
    }
  }

  //Render Todos Function

  function renderTodos(todoList) {
    todoListSection.innerHTML = '';

    todoArray.forEach((todoList) => {
      const listItem = document.createElement('LI');
      listItem.setAttribute('data-id', todoList.id);
      listItem.setAttribute('class', 'todoItem');
      if (todoList.completed == true) {
        //Toggle Check Mark Section
        const checkMarkImg = document.createElement('img');
        checkMarkImg.setAttribute('class', 'completedStyle completed greenFilter');
        checkMarkImg.src = 'fontAwesome/check-circle-solid.svg';
        listItem.appendChild(checkMarkImg);
        //Display Task
        const todoItemSection = document.createElement('div');
        todoItemSection.setAttribute('class', 'todoItemDisplay');
        todoItemSection.innerHTML = `${todoList.task}`
        listItem.appendChild(todoItemSection);

      } else if (todoList.completed == false) {
        //Toggle Check Mark Section
        const checkMarkImg = document.createElement('img');
        checkMarkImg.setAttribute('class', 'completedStyle greyFilter')
        checkMarkImg.src = 'fontAwesome/check-circle-solid.svg';
        listItem.appendChild(checkMarkImg);
        //Display Task
        const todoItemSection = document.createElement('div');
        todoItemSection.setAttribute('class', 'todoItemDisplay');
        todoItemSection.innerHTML = `${todoList.task}`
        listItem.appendChild(todoItemSection);
      }
      //Delete Section
      const deleteItemImg = document.createElement('img')
      deleteItemImg.setAttribute('class', 'deleteItem redFilter');
      deleteItemImg.src = 'fontAwesome/minus-circle-solid.svg';
      listItem.appendChild(deleteItemImg);
      todoListSection.appendChild(listItem);

    })
  }

  function addToLocalStorage(todoArray) {
    localStorage.setItem('todoList', JSON.stringify(todoArray));
    renderTodos(todoArray);
  }

  function getFromLocalStorage() {
    const storedTodoItems = localStorage.getItem('todoList')
    if (storedTodoItems) {
      todoArray = JSON.parse(storedTodoItems);
      console.log(JSON.parse(storedTodoItems));
    }
    renderTodos(todoArray)
  }
  //AddComplete
  function addComplete(id) {
    todoArray.forEach((item) => {
      if (item.id == id) {
        item.completed = true;
      }
    });
    addToLocalStorage(todoArray);
  }

  function removeComplete(id) {
    todoArray.forEach((item) => {
      if (item.id == id) {
        item.completed = false;
      }
    });
    addToLocalStorage(todoArray);
  }

  function deleteItem(id) {
    const findIndex = todoArray.findIndex(item => item.id == id);
    const itemToRemove = todoArray[findIndex]
    todoArray = todoArray.filter((item, index) => item !== itemToRemove);
    console.log('delete function working');
    return addToLocalStorage(todoArray)
  }
  getFromLocalStorage();

  //Light Mode section
  const todoItemElement = document.querySelectorAll('.todoItem')
  const currentTheme = localStorage.getItem("theme");

  function checkTheme() {
    if (currentTheme == 'light') {
      document.body.classList.add('lightTheme')
      todoApp.classList.add('lightTheme');
      todoInputSection.classList.add('lightTheme')
      todoInputElement.classList.add('lightTheme')
      inputBtn.classList.add('lightTheme');
      todoItemElement.forEach(element => element.classList.add('lightTheme'));
      nameResetButton.classList.add('lightTheme');
      nameSubmitBtn.classList.add('lightTheme');
      inputNameElement.classList.add('lightTheme')
    }
  }
  checkTheme();


  lightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('lightTheme');
    todoApp.classList.toggle('lightTheme');
    todoInputSection.classList.toggle('lightTheme')
    todoInputElement.classList.toggle('lightTheme')
    inputBtn.classList.toggle('lightTheme')
    todoItemElement.forEach(element => element.classList.toggle('lightTheme'))
    nameResetButton.classList.toggle('lightTheme');
    nameSubmitBtn.classList.toggle('lightTheme');
    inputNameElement.classList.toggle('lightTheme')
    let theme
    if (todoApp.classList.contains('lightTheme')) {
      theme = 'light'
    } else {
      theme = 'dark'
    }
    localStorage.setItem('theme', theme);
  })

  //Add click listener on parent ul, listen for list item with class of completed and run removeComplete Function, else, addComplete.
  todoListSection.addEventListener('click', (event) => {
    // event.preventDefault();
    if (event.target.classList.contains('completed')) {
      removeComplete(event.target.parentElement.getAttribute('data-id'));
      checkTheme();
    } else {
      addComplete(event.target.parentElement.getAttribute('data-id'));
      checkTheme();
    }
    if (event.target.classList.contains('deleteItem')) {
      deleteItem(event.target.parentElement.getAttribute('data-id'));
    }
  })

})
