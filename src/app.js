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
  function displayWelcome() {
    let todayWelcome = new Date();
    let todayGreeting;
    let hourNow = todayWelcome.getHours();
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

    document.querySelector('[data-welcome-greeting]').innerText = `${todayGreeting}`;
    setTimeout(displayWelcome, 3600000);
  }
  displayWelcome();


  //Display Time
  function getTime() {
    const todayClock = new Date();
    let hours = todayClock.getHours();
    let minutes = todayClock.getMinutes() < 10 ? '0' + todayClock.getMinutes() : todayClock.getMinutes();
    document.querySelector('[data-clock]').innerText = `${hours}:${minutes}`;
    setTimeout(getTime, 1000);
  }
  getTime();

  //Display date
  function displayDate() {
    const todayDate = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayNumber = todayDate.getDate(); //numerical value
    const day = dayNames[todayDate.getDay()];
    const month = monthNames[todayDate.getMonth()];
    const year = todayDate.getFullYear();
    const dateString = `${dayNumber} ${day} ${month} ${year}`;
    document.querySelector('[data-date-display]').innerText = dateString;
    setTimeout(displayDate, 3600000);
  }
  displayDate()

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

  //Enable carriage return (char 13) on form.
  function submitOnEnter(event) {
    if (event.which === 13) {
      event.target.form.dispatchEvent(new Event("submit", {
        cancelable: true
      }));
      event.preventDefault();
    }
  }
  todoInputElement.addEventListener('keypress', submitOnEnter)

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
  const currentTheme = localStorage.getItem("theme");

  function renderTodos(todoList) {

    todoListSection.innerHTML = '';
    todoArray.forEach((todoList, index) => {
      const listItem = document.createElement('LI');
      listItem.setAttribute('data-id', todoList.id);
      // listItem.setAttribute('data-index', index + 1);
      // listItem.setAttribute('draggable', true);
      // listItem.addEventListener('dragstart', () => {
      //   listItem.classList.add('dragging');
      //   console.log('dragstart')
      // });
      // listItem.addEventListener('dragend', () => {
      //   listItem.classList.remove('dragging');
      //   console.log('dragend')
      // });
      // listItem.addEventListener('dragenter', dragEnter);
      // listItem.addEventListener('drop', dragDrop);
      // listItem.addEventListener('dragleave', dragLeave);

      if (currentTheme == 'light') {
        listItem.setAttribute('class', 'todoItem draggable lightTheme');
      } else if (currentTheme == 'dark') {
        listItem.setAttribute('class', 'todoItem draggable');
      }
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

  // Drag Event Functions
  function dragOver(e) {
    e.preventDefault();
    console.log('Event: Dragover')
  }

  function dragEnter() {

    console.log('dragEnter')
  }

  function dragLeave() {
    this.classList.remove('dragging')
    console.log('dragLeave')
  }

  function dragStart() {
    this.classList.add('dragging');
    console.log('dragStart')
  }

  function dragEnd() {
    this.classlist.remove('dragging')
  }

  function dragDrop() {
    console.log('endIndex')
  }


  function addToLocalStorage(todoArray) {
    localStorage.setItem('todoList', JSON.stringify(todoArray));
    renderTodos(todoArray);
  }

  function getFromLocalStorage() {
    const storedTodoItems = localStorage.getItem('todoList')
    if (storedTodoItems) {
      todoArray = JSON.parse(storedTodoItems);
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
    addToLocalStorage(todoArray)
  }

  getFromLocalStorage()
  //Light Mode section
  const todoItemElement = document.querySelectorAll('.todoItem')

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
  checkTheme()

  lightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('lightTheme');
    todoApp.classList.toggle('lightTheme');
    todoInputSection.classList.toggle('lightTheme')
    todoInputElement.classList.toggle('lightTheme')
    inputBtn.classList.toggle('lightTheme')
    todoItemElement.forEach(element => element.classList.toggle('lightTheme'));
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
    window.location.reload();
  })

  //Add click listener on parent ul, listen for list item with class of completed and run removeComplete Function, else, addComplete.
  todoListSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('completed')) {
      removeComplete(event.target.parentElement.getAttribute('data-id'));
    } else {
      addComplete(event.target.parentElement.getAttribute('data-id'));
    }
    if (event.target.classList.contains('deleteItem')) {
      deleteItem(event.target.parentElement.getAttribute('data-id'));
    }
  })
  console.log(todoArray)
  // DOMContentLoaded End
})
