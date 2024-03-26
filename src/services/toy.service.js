import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getTotalCount,
    getDoneCount
}

function query(filterBy = {}) {
    // console.log('query filterBy', filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.createdAt) {
                toys = toys.filter(toy => toy.createdAt < filterBy.createdAt)
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.txt))
            }
            if (filterBy.isDone !== undefined) {
                console.log('11', 11)
                toys = toys.filter(toy => toy.isDone === filterBy.isDone)
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) return storageService.put(STORAGE_KEY, toy)
    return storageService.post(STORAGE_KEY, toy)
}

function getEmptyToy() {
    return {
        txt: '',
        isDone: false
    }
}

function getTotalCount() {
    return query()
        .then(toys => toys.length)
}

function getDoneCount() {
    return query({ isDone: true })
        .then(toys => toys.length)
}


function getDefaultFilter() {
    return {
        txt: '',
        isDone: undefined,
        createdAt: Date.now()
    }
}

// const toy = { _id, txt, isDone, createdAt }
_createToys()
function _createToys() {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!toys || !toys.length) {
        toys = [
            { _id: 1, txt: "Buy groceries", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 2, txt: "Finish project proposal", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 3, txt: "Call mom", isDone: true, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 4, txt: "Go for a run", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 5, txt: "Read book chapter", isDone: true, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) }
        ]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).valueOf()
}