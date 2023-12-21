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
export const REMOVE_TOY_MSGS = 'REMOVE_TOY_MSGS'
export const UPDATE_TOY_CHAT_HISTORY = 'UPDATE_TOY_CHAT_HISTORY'

export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const REMOVE_TOY_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const ADD_TOY_TO_CART = 'ADD_CAR_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    toys: [],
    currToy: null,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort(),
    isLoading: false,
    shoppingCart: [],
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    let shoppingCart
    switch (action.type) {
        // Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_TOY:
            return { ...state, currToy: action.toy }

        case UPDATE_TOY_CHAT_HISTORY:
           return { ...state, currToy: { ...state.currToy, chatHistory: action.chatHistory} }
       
           case UPDATE_TOY_MSGS:
            return { ...state, currToy: { ...state.currToy, msgs: [...state.currToy.msgs, action.msg] } }

        case REMOVE_TOY_MSGS:
            return { ...state, currToy: { ...state.currToy, msgs: state.currToy.msgs.filter(m => m.id !== action.msgId) } }

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

             // Shopping Cart
        case SET_CART_IS_SHOWN:
            return { ...state, isCartShown: action.isCartShown }

        case ADD_TOY_TO_CART:
            shoppingCart = [...state.shoppingCart, action.toy]
            return { ...state, shoppingCart }

        case REMOVE_TOY_FROM_CART:
            shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingCart }

        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state;
    }
}