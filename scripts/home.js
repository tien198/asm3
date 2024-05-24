'use strict'

const loginModal = document.querySelector('#login-modal')
const mainContent = document.querySelector('#main-content')

const logoutBtn = document.querySelector('#btn-logout')

logoutBtn.addEventListener('click', logOut)

// get current user from localStorage then convert to User instance
const currUserObject = JSON.parse(getFromStorage(currUser_KEY))
const currUser = User.parseUser(currUserObject)

// display according user logged in or nor
if (currUser) {
    mainContent.classList.remove('d-none')
    const welcomeMsg = document.querySelector('#welcome-message')
    welcomeMsg.textContent = `Welcome ${currUser.firstName}`
}
else loginModal.classList.remove('d-none')

// logout removing 'curr_user' item in localtorage
function logOut() {
    removeFromStorage(currUser_KEY)
    location.href = './index.html'
}
