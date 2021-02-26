const addTodoBtn = document.querySelector(".add-btn");
const todoListEl = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");
const trashBtn = document.querySelector(".trash-btn");
const darkModeBtn = document.querySelector(".dark-mode");
const bgTop = document.querySelector(".bg");
const container = document.querySelector(".container");
const modeImage = document.querySelector(".image-mode");
let darkModeOn;

// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});

darkModeBtn.addEventListener("click", handleThemeChange);

addTodoBtn.addEventListener("click", () => {
  if (todoInput.value != "") {
    addTodo();
  }
});

document.addEventListener("keydown", (keyCode) => {
  if (keyCode === 13) {
    addTodo();
  }
});

if (localStorage.getItem("theme") === "dark") {
  switchDarkMode();
} else {
  switchLightMode();
}

function addTodo() {
  saveTodos(todoInput.value);

  //add todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //add text and todo
  const todo = document.createElement("li");
  todo.innerText = todoInput.value;
  todo.classList.add("todo");
  todoDiv.appendChild(todo);

  //add completed button
  const completedBtn = document.createElement("button");
  completedBtn.innerText = "✔️";
  completedBtn.classList.add("complete-btn");
  todo.appendChild(completedBtn);

  //add trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerText = "❌";
  trashBtn.classList.add("trash-btn");
  todo.appendChild(trashBtn);

  //clears input
  todoInput.value = "";

  //append to todoList
  todoListEl.appendChild(todoDiv);

  //complete todo
  completedBtn.addEventListener("click", () => {
    todo.style.textDecoration = "line-through";
    todo.style.opacity = "0.5";
  });

  //delete todo
  trashBtn.addEventListener("click", () => {
    // todoDiv.remove()
    todoDiv.style.animation = "slide 250ms ease-in-out";
    todoDiv.addEventListener("transitionend", () => {
      todoDiv.remove();
      todoDiv.style.animation = "none";
    });
  });
}

//functions

//adds to localStorage
function saveTodos(todo) {
  let todos = [];

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

//to Handle theme

function handleThemeChange() {
  darkModeOn = !darkModeOn;

  if (darkModeOn) {
    switchDarkMode();
    return;
  }

  switchLightMode();
}

//DARK MODE

function switchDarkMode() {
  bgTop.classList.add("bg-dark");
  bgTop.classList.remove("bg");
  document.body.style.background = "rgb(20, 20, 20)";
  container.style.background = "#000";
  container.style.boxShadow = "0px 0 5px #fff";
  container.style.color = "#fff";
  todoInput.style.color = "#fff";
  todoInput.style.cursor = "text";
  modeImage.src = "sun.svg";
  localStorage.setItem("theme", "dark");
  addTodoBtn.style.background = "rgba(255, 255, 255, 0.171)";
  addTodoBtn.style.color = "#fff";
}

//LIGHT MODE

function switchLightMode() {
  bgTop.classList.remove("bg-dark");
  bgTop.classList.add("bg");
  document.body.style.background = "#fff";
  container.style.background = "#fff";
  container.style.boxShadow = "0px 0 5px #000";
  container.style.color = "#000";
  todoInput.style.color = "#000";
  modeImage.src = "moon.svg";
  localStorage.setItem("theme", "light");
  addTodoBtn.style.color = "#000";
  todoInput.style.boxShadow = "0px 0 2px #000";
}

//RENDER TODOS

function renderTodos() {
  let todos = [];

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
  }

  todos.forEach((todo) => {
    //creates div for locally stored
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //creates li
    const todoEl = document.createElement("li");
    todoEl.innerText = todo;
    todoDiv.appendChild(todoEl);
    todoEl.classList.add("todo");

    //append to the list
    todoListEl.appendChild(todoDiv);

    //add completed button
    const completedBtn = document.createElement("button");
    completedBtn.innerText = "✔️";
    completedBtn.classList.add("complete-btn");
    todoEl.appendChild(completedBtn);

    //add trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerText = "❌";
    trashBtn.classList.add("trash-btn");
    todoEl.appendChild(trashBtn);

    //complete todo
    completedBtn.addEventListener("click", () => {
      todoEl.style.textDecoration = "line-through";
      todoEl.style.opacity = "0.5";
    });

    trashBtn.addEventListener("click", () => {
      todoDiv.style.animation = "slide 250ms ease-in-out";
      todoDiv.addEventListener("transitionend", () => {
        todoDiv.remove();
        todoDiv.style.animation = "none";
        removeLocalTodos(todoEl);
      });
    });
  });
}

function removeLocalTodos(todo) {
  let todos = [];

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
  }

  const index = todos.indexOf(todo.innerText);
  todos.splice(index, 1);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}
