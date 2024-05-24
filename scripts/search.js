'use strict';

(async function () {
    alert(`latana biden
has less total results`)
}())
const searchInput = document.querySelector('#input-query')
const submitBtn = document.querySelector('#btn-submit')
const newsContainer = document.querySelector('#news-container')
const paginationContainer = document.querySelector('.pagination')
const pagination = new Pagination(createPaginationItem, createPreItem, createNextItem)
const currUser = User.parseUser(getCurUser())
if (!currUser) {
    alert('Please login to continoun!')
    location.href = '../index.html'
}
submitBtn.addEventListener('click', async e => {
    e.preventDefault()
    if (!isType) return
    try {
        const { totalResults, articles } = NewRes.parseNewRes(await currUser.search(searchInput.value))
        pagination.initial(totalResults, currUser.newsPerPage)
        pagination.renderPagination(paginationContainer)
        renderNews(newsContainer, articles)
    } catch (err) {
        console.error(err);
    }

})

// validate whether user type input
function isType() {
    if (searchInput.value) return true
    alert('Please type your search!')
    return false
}

// function generate pagination component items (Element)
function createPaginationItem(i) {
    const a = document.createElement('a')
    a.classList.add('page-link')
    a.textContent = i
    a.addEventListener('click', async e => {
        this.currentPage = i
        const res = await currUser.search(searchInput.value, this.currentPage)
        renderNews(newsContainer, res.articles)
        this.reRenderNewActive()
    })
    return createLi(a)
}

function createPreItem() {
    const btn = document.createElement('button')
    btn.classList.add('page-link')
    btn.textContent = 'Previous'
    btn.addEventListener('click', async e => {
        --this.currentPage
        const res = await currUser.search(searchInput.value, this.currentPage)
        renderNews(newsContainer, res.articles)
        this.reRenderNewActive()
    })
    return createLi(btn)
}

function createNextItem() {
    const btn = document.createElement('button')
    btn.classList.add('page-link')
    btn.textContent = 'Next'
    btn.addEventListener('click', async e => {
        ++this.currentPage
        const res = await currUser.search(searchInput.value, this.currentPage)
        renderNews(newsContainer, res.articles)
        this.reRenderNewActive()
    })
    return createLi(btn)
}

function createLi(el) {
    const li = document.createElement('li')
    li.classList.add('page-item')
    li.insertAdjacentElement('beforeend', el)
    return li
}