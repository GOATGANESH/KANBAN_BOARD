// CONTAINERS
let toDoContainer = document.querySelector(".todo-container");
let inProgressContainer = document.querySelector(".in-progress-task-container");
let completedContainer = document.querySelector(".completed-task-container");

//COUNTING VARIABLES
let toDoCount = document.querySelector(".t-task-list").childElementCount;
let ipCount = document.querySelector(".i-task-list").childElementCount;
let compCount = document.querySelector(".c-task-list").childElementCount;

//MODAL VARIABLES
let modal = document.querySelector(".modal");
let toggleModal = document.querySelector("#toggle-modal");
let closeModal = document.getElementById("cancel-task");

//TASK VARIABLES
let addTask = document.getElementById("add-task");
let deleteTask = document.getElementById("delete-task");
let taskTitle = "";
let taskDescription = "";
let taskArray = [];

//OTHERS VARIABLES
let taskList = document.querySelectorAll(".task");
let draggedElement = null;

taskList.forEach((task) => {
  task.addEventListener("drag", (e) => {
    draggedElement = task;
  });
});

// FUNCTION TO ADD DRAG EVENTS
function addDragEvents(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.childNodes[3].appendChild(draggedElement);
    column.classList.remove("hover-over");
    updateTaskCount();
  });
}

// ADDING DRAG EVENT ON CONTAINERS
addDragEvents(toDoContainer);
addDragEvents(inProgressContainer);
addDragEvents(completedContainer);

//FUNCTION TO SHOW THE COUNT OF TASKS
function showCount() {
  document.getElementById("t-count").innerText = toDoCount;
  document.getElementById("i-count").innerText = ipCount;
  document.getElementById("c-count").innerText = compCount;
}
showCount();

//TOGGLE MODAL
toggleModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
});
closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

function clearInput() {
  document.getElementById("task-name").value = "";
  document.getElementById("task-description").value = "";
}

//---------- ADD TASK ----------
function addTaskToContainer(myTask) {
  if (myTask) {
    let newTask = document.createElement("div");
    newTask.setAttribute("draggable", "true");
    newTask.classList.add("task");
    newTask.innerHTML = `
              <div class="task-title"><h2>${myTask.title}</h2></div>
              <div class="task-desc"><p>${myTask.desc}</p></div>
              <button id="delete-task" class="btn">Delete</button>`;

    newTask.addEventListener("drag", (e) => {
      draggedElement = newTask;
    });
    newTask.childNodes[5].addEventListener("click",(e)=>{
        removeTask(e.target.parentElement)
    })
    document.querySelector(".t-task-list").appendChild(newTask);
    taskArray.push(myTask);
    updateTaskCount()
    clearInput();
    modal.style.display = "none";
  }
}

function getInput() {
  taskTitle = document.getElementById("task-name").value.trim();
  taskDescription = document.getElementById("task-description").value.trim();
  if (taskTitle != "" && taskDescription != "") {
    let tempTask = { title: taskTitle, desc: taskDescription };
    addTaskToContainer(tempTask);
  }
}

if (addTask) {
  addTask.addEventListener("click", (e) => {
    getInput();
  });
}

// ----- DELETE TASK ----------
function removeTask(target){
  target.parentElement.removeChild(target)
  updateTaskCount()
}

deleteTask.addEventListener("click",(e)=>{
   removeTask(e.target.parentElement)
},false)

//-------- UPDATE COUNT ----------
function updateTaskCount() {
   
  toDoCount = document.querySelector(".t-task-list").childElementCount;
  ipCount = document.querySelector(".i-task-list").childElementCount;
  compCount = document.querySelector(".c-task-list").childElementCount;
  showCount()
}

