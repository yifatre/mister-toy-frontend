import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"

const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered', 'Educational']

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getLabels
}

function query(filterBy = {}) {
    // console.log('query filterBy', filterBy)

    //* Server
    return httpService.get('toy', { params: { filterBy } })

    //*LOCAL STORAGE
    // return storageService.query(STORAGE_KEY)
    //     .then(toys => {
    //         if (filterBy.txt) {
    //             const regExp = new RegExp(filterBy.txt, 'i')
    //             toys = toys.filter(toy => regExp.test(toy.name))
    //         }
    //         if (filterBy.inStock !== undefined) {
    //             console.log('11', 11)
    //             toys = toys.filter(toy => toy.inStock === filterBy.inStock)
    //         }
    //         return toys
    //     })
}

function getLabels() {
    return [...labels]
}

function getById(toyId) {

    return httpService.get(`toy/${toyId}`)

    // return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {

    return httpService.delete(`toy/${toyId}`)


    // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {

    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }

    // if (toy._id) return storageService.put(STORAGE_KEY, toy)
    // return storageService.post(STORAGE_KEY, toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        inStock: undefined,
        labels: []
    }
}

// const toy = { _id, txt, isDone, createdAt }
// _createToys()
function _createToys() {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Remote Control Car',
                price: 79,
                labels: ['Car', 'Remote Control', 'Toy'],
                createdAt: 1631031801022,
                inStock: false,
            },
            {
                _id: 't103',
                name: 'Building Blocks',
                price: 45,
                labels: ['Building Blocks', 'Educational', 'Toy'],
                createdAt: 1631031801033,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Teddy Bear',
                price: 55,
                labels: ['Stuffed Animal', 'Cuddly', 'Toy'],
                createdAt: 1631031801044,
                inStock: true,
            }
        ]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
}



function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).valueOf()
}