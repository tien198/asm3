'use strict'



const paginationContainer = document.querySelector('#content .pagination')
const newsContainer = document.querySelector('#news-container')
/**
 * @type {Element[]} li - li array
*/
const jsonUser = JSON.parse(getFromStorage(currUser_KEY)) || null
const currUser = User.parseUser(jsonUser)
if (!currUser) {
    alert('Please log in to read news!')
    location.href = '/index.html'
}


// Pagination class and it's methods is declared in '/models/models.js'
// constructor has 3 parameters are functions that generate correspond component Elements
// that functions should be declared to customize the generated components
const pagination = new Pagination(createPaginationItem, createPrevItem, createNextItem);
// IIFE async function
(async function () {
    try {
        const res = NewRes.parseNewRes(await currUser.getNews())
        renderNews(newsContainer, res.articles)
        // pagination function need `totalResults` and `newsPerPage` to identify the amout of items should be created
        // Finally, we defind the element that should be wrap the created pagination items to display in HTML
        pagination.initial(res.totalResults, currUser.newsPerPage)
        pagination.renderPagination(paginationContainer)
    } catch (err) {
        console.error(err);
    }
}())



// pagination

/**
     * create pagination item
     * @param {number} i - the number of page
     * @return {Element} pagination item (element) with eventListener click
     */
function createPaginationItem(i) {
    // create li element structuring like below
    `<li class="page-item disabled" id="page-num">
        <a class="page-link">1</a>
    </li>`
    // the first li will be activated
    const a = document.createElement('a')
    // i === 1 ? a.parentNode.add('active') : {}
    // create an a element with an eventListener inside li
    a.className = 'page-link'
    a.textContent = i
    a.addEventListener('click', async (e) => {
        e.preventDefault()
        currUser.createUrl(i)
        const res = NewRes.parseNewRes(await currUser.getNews())
        renderNews(newsContainer, res.articles)
        // remove the previous actived li and active the current li
        this.currentPage = i
        this.reRenderNewActive()
    })
    return createLi(a)
}

/**
     * create prevItem
     * @return {Element} prevItem 
     */
function createPrevItem() {
    const prevBtn = document.createElement('button')
    prevBtn.classList.add('page-link', 'disabled')
    prevBtn.id = 'btn-prev'
    prevBtn.textContent = 'Previous'
    // event clicking the button
    prevBtn.addEventListener('click', async (e) => {
        --this.currentPage

        this.reRenderNewActive()
        // fetch data and re-render (AJAX)
        currUser.createUrl(this.currentPage);
        const news = NewRes.parseNewRes(await currUser.getNews())
        renderNews(newsContainer, news.articles)
    })
    return createLi(prevBtn)
}

/**
     * create nextItem
     * @return {Element} nextItem
     */
function createNextItem() {
    const nextBtn = document.createElement('button')
    nextBtn.classList.add('page-link')
    nextBtn.id = 'btn-next'
    nextBtn.textContent = 'Next'
    nextBtn.addEventListener('click', async (e) => {
        ++this.currentPage
        this.reRenderNewActive()
        // fetch data and re-render (AJAX)
        currUser.createUrl(this.currentPage);
        const news = NewRes.parseNewRes(await currUser.getNews())
        renderNews(newsContainer, news.articles)
    })
    return createLi(nextBtn)
}

/**
     * create li element 
     * @param {Element} el - the element is wraped by li
     * @return {Element} li element
     */
function createLi(el) {
    const li = document.createElement('li')
    li.classList.add('page-item')
    li.insertAdjacentElement('beforeend', el)
    return li
}
