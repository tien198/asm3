'use strict'

const userName = document.querySelector('#input-username')
const password = document.querySelector('#input-password')

const submitBtn = document.querySelector('#btn-submit')

submitBtn.addEventListener('click', login)
const userArr = JSON.parse(getFromStorage(usrs_KEY))

function login(e) {
    e.preventDefault()
    // find user and check password 
    // if username and password is correct, save the user info to localStorage to indicate that user has loged in
    // otherwise, display error inform and user retype password
    const currUser = userArr.find(usr => usr.userName === userName.value && usr.password === password.value)
    if (currUser) {
        saveToStorage(currUser_KEY, JSON.stringify(currUser))
        location.href = '/index.html'
    }
    else {
        alert('user name or password was wrong')
        password.focus()
        password.value = ''

    }
}