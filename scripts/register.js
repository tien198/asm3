'use strict'

const firstName = document.querySelector('#input-firstname')
const lastName = document.querySelector('#input-lastname')
const userName = document.querySelector('#input-username')
const passWord = document.querySelector('#input-password')
const passWordConfirm = document.querySelector('#input-password-confirm')

const submitBtn = document.querySelector('#btn-submit')

submitBtn.addEventListener('click', creatUser)
const userArr = getUsers()

// submitBtn.addEventListener('click', e => creatUser())

// create user and insert to localStorage
// before create, validate inputs
function creatUser() {
    if (!isValidInputs()) return
    const user = new User(firstName.value, lastName.value, userName.value, passWord.value)
    userArr.push(user)
    const userArrJson = JSON.stringify(userArr)
    saveToStorage(usrs_KEY, userArrJson)
    location.href = '../index.html'
}


// input validate functions

// This function calls all validate functions to return boolen
function isValidInputs() {
    return isNNInputs()
        && isValidUserName()
        && isValidPassword()
        && isValidPasswordConfirm()
}

// validate not null input
function isNN(input, inputName) {
    if (input.value)
        return true
    alert(`${inputName} can't not be null!`)
    return false
}

function isNNInputs() {
    return isNN(firstName, 'First name')
        && isNN(lastName, 'Last name')
        && isNN(passWord, 'Password')
        && isNN(passWordConfirm, 'Password confirm')
}

// user name must be unique
function isValidUserName() {
    if (!userArr.find(usr => usr.userName === userName.value))
        return true
    alert('User name has existed!')
    return false
}

// password must be greater than 8 characters
function isValidPassword() {
    if (passWord.value.length > 8) return true
    alert('Password length must be greater than 8 characters!')
    return false
}

// passwordConfirm must simulate to password
function isValidPasswordConfirm() {
    if (passWord.value == passWordConfirm.value) return true
    alert('Password confirm must simulate to password')
    return false
}



