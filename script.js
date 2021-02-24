const addTodoBtn = document.querySelector(".add-btn")
const todoListEl = document.querySelector(".todos")
const todoInput = document.querySelector(".todo-input")
const trashBtn = document.querySelector(".trash-btn")
const darkModeBtn = document.querySelector(".dark-mode")
const bgTop = document.querySelector(".bg")
const container = document.querySelector(".container")
const modeImage = document.querySelector(".image-mode")
let darkModeOn

// Event Listeners
addTodoBtn.addEventListener("click", () => {
    if(todoInput.value != ''){
        addTodo()
    }
})

if(localStorage.getItem("theme") === "dark"){
    switchDarkMode()
}else{
    switchLightMode()
}

function addTodo(){
    saveTodos(todoInput.value)
    //add todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo-div")
    //add text and todo
    const todo = document.createElement("li")
    todo.innerText = todoInput.value
    todo.classList.add("todo")
    todoDiv.appendChild(todo)
    //add completed button
    const completedBtn = document.createElement("button")
    completedBtn.innerText = '✔️'
    completedBtn.classList.add("complete-btn")
    todo.appendChild(completedBtn)
    //add trash button
    const trashBtn = document.createElement("button")
    trashBtn.innerText = '❌'
    trashBtn.classList.add("trash-btn")
    todo.appendChild(trashBtn)
    //append to todoList
    todoListEl.appendChild(todoDiv)
    //complete todo
    completedBtn.addEventListener("click", () => {
        todo.style.textDecoration = 'line-through'
        todo.style.opacity = '0.5'
    })
    //delete todo
    trashBtn.addEventListener("click", () => {
        todoDiv.style.animation = 'fall 250ms'
        todoDiv.remove()
    })
    //add to local storage
}

function saveTodos(todo){
    let todos = []

    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    
    localStorage.setItem("todos", JSON.stringify(todos))
}

function handleThemeChange(){
    darkModeOn = !darkModeOn

    if(darkModeOn) {
        switchDarkMode()
        return
    }

    switchLightMode()
}

darkModeBtn.addEventListener("click", handleThemeChange)

function switchDarkMode(){
    bgTop.classList.add("bg-dark")
    bgTop.classList.remove("bg")
    document.body.style.background = "rgb(20, 20, 20)"
    container.style.background = "#000"
    container.style.boxShadow = "0px 0 5px #fff"
    container.style.color = "#fff"
    todoInput.style.color = "#fff"
    todoInput.style.cursor = "text"
    modeImage.src = "sun.svg"
    localStorage.setItem("theme", "dark")
}

function switchLightMode(){
    bgTop.classList.remove("bg-dark")
    bgTop.classList.add("bg")
    document.body.style.background = "#fff"
    container.style.background = "#fff"
    container.style.boxShadow = "0px 0 5px #000"
    container.style.color = "#000"
    todoInput.style.color = "#000"
    modeImage.src = "moon.svg"
    localStorage.setItem("theme", "light")
}
