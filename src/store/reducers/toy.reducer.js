import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_TOY = 'SET_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_LABEL = 'SET_LABEL'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY'
export const UPDATE_TOY_MSGS = 'UPDATE_TOY_MSGS'


const initialState = {
    toys: [],
    currToy: null,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort(),
    isLoading: false
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {
        // Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_TOY:
            console.log('SET_TOY')
            console.log('state:', state)
            return { ...state, currToy: action.toy }

        case UPDATE_TOY_MSGS:
            console.log('state:', state)
            return { ...state, currToy: { ...state.currToy, msgs: [...state.currToy.msgs, action.msg] } }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }


        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_FILTER_CATEGORY:
            return { ...state, filterBy: { ...toyService.getDefaultFilter(), ...action.filterBy } }

        case SET_LABEL: {
            //       if (action.label.checked) {
            //         return {...state, filterBy : {...state.filterBy ,labels: [...state.filterBy.labels, action.label.name]}}
            //     } else {
            // return {...state, filterBy : {...state.filterBy ,labels: state.filterBy.labels.filter(l => l !==  action.label.name)}}
            return { ...state, filterBy: { ...state.filterBy, labels: action.labels } }


        }

        case SET_SORT_BY:
            return { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state;
    }
}