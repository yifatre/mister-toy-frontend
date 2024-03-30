// import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"

// const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered', 'Educational']

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    getFilterFromParams
}

async function query(filterBy = {}) {
    // console.log('query filterBy', filterBy)

    //* Server
    try {
        const toys = await httpService.get('toy', filterBy )
        return toys
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }

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

async function getById(toyId) {
    try {
        return await httpService.get(`toy/${toyId}`)
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }
    // return storageService.get(STORAGE_KEY, toyId)
}

async function remove(toyId) {
    try {
        return await httpService.delete(`toy/${toyId}`)
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }

    // return storageService.remove(STORAGE_KEY, toyId)
}

async function save(toy) {
    try {
        if (toy._id) {
            return await httpService.put(`toy/${toy._id}`, toy)
        } else {
            return await httpService.post('toy', toy)
        }
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
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

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        inStock: searchParams.get('inStock') || defaultFilter.inStock,
        labels: searchParams.getAll('labels') || defaultFilter.labels
    }
}

// const toy = { _id, txt, isDone, createdAt }
// _createToys()
// function _createToys() {
//     let toys = JSON.parse(localStorage.getItem(STORAGE_KEY))
//     if (!toys || !toys.length) {
//         toys = [
//             {
//                 _id: 't101',
//                 name: 'Talking Doll',
//                 price: 123,
//                 labels: ['Doll', 'Battery Powered', 'Baby'],
//                 createdAt: 1631031801011,
//                 inStock: true,
//             },
//             {
//                 _id: 't102',
//                 name: 'Remote Control Car',
//                 price: 79,
//                 labels: ['Car', 'Remote Control', 'Toy'],
//                 createdAt: 1631031801022,
//                 inStock: false,
//             },
//             {
//                 _id: 't103',
//                 name: 'Building Blocks',
//                 price: 45,
//                 labels: ['Building Blocks', 'Educational', 'Toy'],
//                 createdAt: 1631031801033,
//                 inStock: true,
//             },
//             {
//                 _id: 't104',
//                 name: 'Teddy Bear',
//                 price: 55,
//                 labels: ['Stuffed Animal', 'Cuddly', 'Toy'],
//                 createdAt: 1631031801044,
//                 inStock: true,
//             }
//         ]
//     }
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
// }



// function getRandomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).valueOf()
// }