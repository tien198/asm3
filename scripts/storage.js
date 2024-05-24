'use strict'

const usrs_KEY = 'user_array'
const currUser_KEY = 'curr_user'
const taskList_KEY = 'todo_list'

function saveToStorage(key, val) {
    localStorage.setItem(key, val)
    return val
}

function getFromStorage(key) {
    return localStorage.getItem(key)
}

function removeFromStorage(key) {
    localStorage.removeItem(key)
}

// Ultilities

function getUsers() {
    return JSON.parse(getFromStorage(usrs_KEY)) || []
}

function getCurUser() {
    return JSON.parse(getFromStorage(currUser_KEY))
}

// get tasks owned by definded user
function getCurUsrTasks(user) {
    return getTaskList().filter(u => u.owner === user.userName)
}

// get all tasks
function getTaskList() {
    return JSON.parse(getFromStorage(taskList_KEY)) || []
}