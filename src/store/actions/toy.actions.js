import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY, SET_IS_LOADING , SET_FILTER_BY, SET_SORT_BY , SET_LABEL} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    const { filterBy } = store.getState().toyModule
    const { sortBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy , sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


// export function removeToyOptimistic(toyId) {
//     store.dispatch({ type: REMOVE_TOY, toyId })
//     return toyService.remove(toyId)
//         .catch(err => {
//             store.dispatch({ type: TOY_UNDO })
//             console.log('toy action -> Cannot remove toy', err)
//             throw err
//         })
// }

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy){
    store.dispatch({ type: SET_FILTER_BY, filterBy})
    
}

export function setSortBy(sortBy){
    store.dispatch({ type: SET_SORT_BY, sortBy })

}

export function setLabels(label){
    store.dispatch({ type: SET_LABEL, label })

}

