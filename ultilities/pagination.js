'use strict'

// constructor has 3 parameters are functions that generate correspond component Elements
// that functions should be declared and return an Element. This step to customize the generated components
// 3 Element functions above will be called by `Pagination` instance, therefor, we could use `this` keyword to manipulate the properties inside `Pagination`
// it will helpfull to addEventListener()

// pagination function need `totalResults` and `newsPerPage` to identify the amout of items should be created
// pass  `totalResults` and `newsPerPage` through `initial(totalResults, pageSize)` method
// This step will generate pagination items and push it to an array name 'paginationArr'

// Finally, we defind the element that should be wrap the created pagination items to display in HTML
// use `renderPagination(paginationContainer)` method to defind container
// the method will loop for items in `paginationArr` to insert HTML Element to the container

class Pagination {
    currentPage = 1
    #totalPages
    prevItem
    nextItem
    /**
     * @type {Element[]} type - an array of pagination items
    */
    paginationArr = []

    /**
     * constructor - All func will be call in `inital()` method to generate pagination items (Elements) and pushed to `paginationArr` array
     * @param {Function} createPaginationItem - func that create pagination items, total of items according totalPages through for loop
     * - func has an `i` parameter indicate the number of page
     * - return an created item (Element)
     * @param {Function} prevItem - func that create prevItem
     * - func return an created prevItem that trigger previous button
     * @param {Function} nextItem - func that create nextItem
     * - func return an created nextItem that trigger next button
    */
    constructor(createPaginationItem, prevItem, nextItem) {
        this.createPaginationItem = createPaginationItem
        this.createPreItem = prevItem
        this.createNextItem = nextItem
    }

    /**
     * @param {number} totalResults - total results
     * @param {number} pageSize - news per page
    */
    initial(totalResults, pageSize) {
        let total = totalResults / pageSize
        this.#totalPages = Number.isInteger(total) ? total : Math.trunc(total) + 1
        // create 'prevItem' and 'nextItem' fields then push them to 'paginationArr' field through 'createPaginationArr()' method
        this.createPreItem ? this.prevItem = this.createPreItem() : {}
        this.createNextItem ? this.nextItem = this.createNextItem() : {}
        this.paginationArr = []
        this.createPaginationArr()
    }

    /**
     * push all pagination items to paginationArr (include prevItem && nextItem if existed)
     */
    createPaginationArr() {
        // push prevItem to paginationArr (if existed)
        this.prevItem ? this.paginationArr.push(this.prevItem) : {}
        // create and push all pagination item according '#totalPages' field
        for (let i = 1; i <= this.#totalPages; i++) {
            const item = this.createPaginationItem(i)
            i === 1 ? item.classList.add('active') : {}
            this.paginationArr.push(item)
        }
        // push nextItem to paginationArr (if existed)
        this.nextItem ? this.paginationArr.push(this.nextItem) : {}
    }

    /**
     * render pagination to an container
     * @param {Element} paginationContainer - the Element should wrap pagination items
     */
    renderPagination(paginationContainer) {
        // render each pagination item was pushed to 'paginationArr' field through 'createPaginationArr()' method
        paginationContainer.innerHTML = ''
        this.paginationArr.forEach(p => {
            paginationContainer.insertAdjacentElement('beforeend', p)
        })
        this.reRenderNewActive()

    }

    /**
     * deactive the old pagination item and active another of present
     */
    reRenderNewActive() {
        // only render new active 'preItem' && 'nextItem' if they do exist
        if (this.prevItem)
            this.paginationArr[0].classList.remove('disabled')
        if (this.nextItem)
            this.paginationArr[this.paginationArr.length - 1].classList.remove('disabled')

        //  * deactive the old pagination item and active another of present
        this.paginationArr.forEach(li => li.classList.remove('active'))
        this.paginationArr[this.currentPage].classList.add('active')

        if (this.prevItem)
            this.currentPage === 1 ? this.paginationArr[0].classList.add('disabled') : {}
        if (this.nextItem)
            this.currentPage === this.#totalPages ? this.paginationArr[this.paginationArr.length - 1].classList.add('disabled') : {}
    }

}




/**
 * display fetched news to newContainer
 * @param {Element} container - the element should wrap news
 * @param {article[]} news - articles array is an property of NewRes
 */
function renderNews(container, news) {
    container.innerHTML = ''
    news.forEach(art => renderNew(container, art))
}

/**
 * display single new
 * @param {articles} art - the article
 */
function renderNew(container, art) {
    const html =
        `<div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${art.urlToImage}"
                            class="card-img"
                            alt="${art.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${art.title}</h5>
                            <p class="card-text">${art.description}</p>
                            <a target="_blank" href="${art.url}"
                                class="btn btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    container.insertAdjacentHTML('beforeend', html)
}
