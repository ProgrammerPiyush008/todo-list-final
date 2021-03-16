const addTodoBtn = document.querySelector(".add-btn");
const todoListEl = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");
const trashBtn = document.querySelector(".trash-btn");
const completedBtn = document.querySelector(".completed-btn");
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

document.addEventListener("keydown", (e) => {
  if (e.which === 13) {
    addTodo();
  }
});

if (localStorage.getItem("theme") === "dark") {
  switchDarkMode();
} else {
  switchLightMode();
}

function addTodo() {
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

//to Handle theme

function handleThemeChange() {
  darkModeOn = !darkModeOn;

  if (darkModeOn) {
    switchDarkMode();
    return;
  }

  switchLightMode();
}

//DARKMODE

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
    todoDiv.appendChild(completedBtn);

    //add trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerText = "❌";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //complete todo
    completedBtn.addEventListener("click", () => {
      todoDiv.style.textDecoration = "line-through";
      todoDiv.style.opacity = "0.5";
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

// DOesnt work!!!!!
function removeLocalTodos(todo) {
  //EMPTY?
  let todos = [];

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const index = todo.innerText;
  console.log(index);

  todos.splice(todos.indexOf(index), 1);
  console.log(todos);
}
