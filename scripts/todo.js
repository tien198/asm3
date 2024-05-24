'use strict'

const todoContainer = document.querySelector('#todo-list')
const taskInput = document.querySelector('#input-task')
const addBtn = document.querySelector('#btn-add')

const currUser = getCurUser()
if (!currUser) {
    alert('Please log in to view your tasks!')
    location.href = '../index.html'
}

// getCurUsrTasks() and getTaskList() are declared in storage.js // Ultilities
// use to get tasks owned by definded user
const taskList = getTaskList()
let curTaskList = getCurUsrTasks(currUser)

// display tasks
rendercurTaskList()

// add new task clicking btn
addBtn.addEventListener('click', e => {
    const task = taskInput.value
    // ower is an User instance
    // create a new task and push to taskList. Then convert to json and save to localStorage
    const newTask = new Todo(task, currUser.userName)
    taskList.push(newTask)
    const jsonTaskList = JSON.stringify(taskList)
    saveToStorage(taskList_KEY, jsonTaskList)
    renderTask(newTask)
    // clear input form
    taskInput.value = ''
})

// render curTaskList, only render the tasks owned by current user
function rendercurTaskList() {
    curTaskList.forEach(todo => {
        // foreach todo object, create an li element with an addEventListener() and insert to ul
        renderTask(todo)
    })
}

/**
 * render new task to ul DOM
 * @param {Todo} task - the Todo instance
 */
function renderTask(task) {
    // create an li element with an addEventListener() and insert to ul
    const li = document.createElement('li')
    task.isDone ? li.classList.add('checked') : {}
    li.innerHTML = task.task
    li.addEventListener('click', function (e) {
        if (e.target !== this) return
        this.classList.toggle('checked')
        toggleTaskToStorage(task.task)
    })
    const closeBtn = document.createElement('span')
    closeBtn.className = 'close'
    closeBtn.textContent = '×'
    closeBtn.addEventListener('click', function (e) {
        deleteTask.call(this, task.task)
    })
    li.insertAdjacentElement('beforeend', closeBtn)
    todoContainer.insertAdjacentElement('beforeend', li)
}

/**
 *  save the Todo's isDone property to localStorage
 * @param {string} task - the name of definded task
 */
function toggleTaskToStorage(task) {
    // find the definded todo object and modify is's isDone property toggle bettween true and false
    const todo = taskList.find(t => t.task === task)
    todo.isDone = todo.isDone ? false : true

    // Convert taskList to json string and save to storage
    const jsonTodo = JSON.stringify(taskList)
    saveToStorage(taskList_KEY, jsonTodo)
}

/**
 * remove the definded task
 * @param {string} task - name of task
 */
function deleteTask(task) {
    // remove the li element in html
    this.parentElement.remove()
    const rmvTaskIndex = taskList.findIndex(t => t.task === task)
    taskList.splice(rmvTaskIndex, 1)
    saveToStorage(taskList_KEY, JSON.stringify(taskList))
}
