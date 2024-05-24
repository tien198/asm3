'use strict'

const newsPerPage = document.querySelector('#input-page-size')
const category = document.querySelector('#input-category')

const submitBtn = document.querySelector('#btn-submit')
/**
 * @type {User[]} type - description
*/
const userArr = getUsers()
const currUser = User.parseUser(getCurUser())
if (!currUser) {
    alert('Please login to settings')
    location.href = './login.html'
}

displayPreviousVals()

submitBtn.addEventListener('click', e => {
    alert('Change settings success!')
    const modifyUser = userArr.find(u => u.userName === currUser.userName)
    modifyUser.newsPerPage = Number(newsPerPage.value)
    modifyUser.category = category.value
    saveToCurrUser(modifyUser)
    saveToStorage(usrs_KEY, JSON.stringify(userArr))
})


function displayPreviousVals() {
    newsPerPage.value = currUser.newsPerPage
    category.value = currUser.category
}

function saveToCurrUser(user) {
    saveToStorage(currUser_KEY, JSON.stringify(user))
}

function clearInput() {
    newsPerPage.value = ''
    category.value = ''
}
