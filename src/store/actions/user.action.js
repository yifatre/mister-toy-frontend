import { userService } from "../../services/user.service.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    }
    catch (err) {
        console.log('user actions -> Cannot login', err)
        throw new Error('Something went wrong, try again later')
    }


    // return userService.login(credentials)
    //     .then((user) => {
    //         store.dispatch({ type: SET_USER, user })
    //     })
    //     .catch((err) => {

    //     })
}

export async function signUp(credentials) {
    try {
        const user = await userService.signUp(credentials)
        store.dispatch({ type: SET_USER, user })
    }
    catch (err) {
        console.log('user actions -> Cannot signUp', err)
        throw new Error('Something went wrong, try again later')
    }


    // return userService.signUp(credentials)
    //     .then((user) => {
    //         store.dispatch({ type: SET_USER, user })
    //     })
    //     .catch((err) => {
    //         console.log('user actions -> Cannot signUp', err)
    //         throw err
    //     })
}

export async function logout(credentials) {
    try{
        userService.logout(credentials)
        store.dispatch({ type: SET_USER, user: null })
    }
    catch (err) {
        console.log('user actions -> Cannot logout', err)
        throw new Error('Something went wrong, try again later')
    }

    // return userService.logout(credentials)
    //     .then(() => {
    //         store.dispatch({ type: SET_USER, user: null })
    //     })
    //     .catch((err) => {
    //         console.log('user actions -> Cannot logout', err)
    //         throw err
    //     })
}
