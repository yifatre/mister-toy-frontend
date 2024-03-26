import { toyService } from "../../services/toy.service"

// -TOYS
export const SET_TOYS = 'SET_TOYS'
export const GET_TOY = 'GET_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    toys: null,
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action = {}) { // {type,  payload}
    switch (action.type) {
        case SET_TOYS: return { ...state, toys: action.toys }

        case REMOVE_TOY: return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }

        case ADD_TOY: return { ...state, toys: [...state.toys, action.toy] }

        case UPDATE_TOY: return { ...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }

        case SET_FILTER_BY: return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default: return state
    }
}