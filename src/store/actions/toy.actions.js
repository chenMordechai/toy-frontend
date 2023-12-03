import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY, SET_IS_LOADING, SET_FILTER_BY, SET_SORT_BY, SET_LABEL, SET_FILTER_CATEGORY, UPDATE_TOY_MSGS, SET_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    const { sortBy } = store.getState().toyModule
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadToy(toyId) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toy = await toyService.getById(toyId)
        store.dispatch({ type: SET_TOY, toy })
    } catch (err) {
        console.log('toy action -> Cannot load toy', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err

    }
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

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err

    }
}

export async function saveToyMsg(msgTxt, toyId) {
    try {
        const msgToSave = await toyService.saveMsg(msgTxt, toyId)
        store.dispatch({ type: UPDATE_TOY_MSGS, msg: msgToSave })
        return msgToSave

    } catch (err) {
        console.log('toy action -> Cannot save toy msg', err)
        throw err

    }

}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })

}
export function setCategory(filterBy) {
    store.dispatch({ type: SET_FILTER_CATEGORY, filterBy })

}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })

}

export function setLabels(labels) {
    store.dispatch({ type: SET_LABEL, labels })

}

