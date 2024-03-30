import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const activities = { add: 'Added a todo', remove: 'Remove a todo', done: 'Marked a todo as done', undone: 'Marked a todo as undone' }

export const userService = {
    login,
    logout,
    signUp,
    getLoggedinUser,
    addActivity,
    getEmptyCredentials
}

function getById(userId) {
    return httpService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    try {
        const user = await httpService.post('auth/login', { username, password })
        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid login details')
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }
}

async function signUp({ username, password, fullName }) {
    try {
        const loggedinUser = await httpService.post('auth/login', { username, password, fullName })
        return _setLoggedinUser(loggedinUser)
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }
}

async function logout() {
    try {
        const msg = await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        return Promise.resolve()
    }
    catch (err) {
        console.log('err', err)
        throw new Error('Something went wrong, try again later')
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullName: user.fullName }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullName: ''
    }
}

function addActivity(type) {
    return { txt: activities[type], at: Date.now() }
}

// const user = {
//     _id: '',
//     username: 'peteron',
//     password: 'peter1',
//     fullName: 'Peter Pan',
//     prefs: {},
//     activities: [{ txt: 'Added a Todo', at: 1523873242735 }]
// }