'use strict'

class User {
    // #api_KEY = '9ad40e2353b34078b47fc60dbba50305'
    #api_KEY = '72c662548c154f56822f7f35c8c10d00'
    #url
    constructor(firstName, lastName, userName, passWord, category = '', newsPerPage = 5) {
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.password = passWord
        this.category = category
        this.newsPerPage = newsPerPage
        this.createUrl()
    }

    /**
     * create an url to fetch news data. This url is private field inside User
     * @param {number} page - the page number in pagination. Default equal 1
     */
    createUrl(page = 1) {
        this.#url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&pageSize=${this.newsPerPage}&page=${page}&apiKey=${this.#api_KEY}`
    }
    async getNews() {
        try {
            const res = await fetch(this.#url)
            const jsonData = await res.json()
            if (!res.ok) throw new Error(jsonData.message)
            return jsonData
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * search news according a definded keyword
     * @param {string} query - the keyword wanna search
     * @param {number} page - the page number in pagination. Default equal 1
     */
    async search(query, page = 1) {
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${this.newsPerPage}&page=${page}&apiKey=${this.#api_KEY}`
        try {
            const res = await fetch(url)
            const jsonData = await res.json()
            if (!res.ok) throw new Error(jsonData.message)
            return jsonData
        } catch (err) {
            throw new Error(err)
        }
    }


    static parseUser(user) {
        return user ? new User(user.firstName, user.lastName, user.userName, user.password, user.category, user.newsPerPage) : null
    }
}

class Todo {
    constructor(task, owner, isDone = false) {
        this.task = task
        this.owner = owner
        this.isDone = isDone
    }
}

class NewRes {
    /**
     * @param {string} status - state of response
     * @param {number} totalResults - total of result
     * @param {article[]} articles - description
     */
    constructor(status, totalResults, articles) {
        this.status = status
        this.totalResults = totalResults
        this.articles = articles
    }
    static parseNewRes(newRes) {
        return new NewRes(newRes.status, newRes.totalResults, newRes.articles)
    }
}


// Tính đóng gói là việc không can thiệp hoặc lấy ra được dữ liệu private
// Log thì chỉ đơn giản là log thôi, mục đích để debug chứ log vậy cũng không tác dụng 
// OOP cũng ít gặp những tính chất đó