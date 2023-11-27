
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}) {
    filterBy = {...filterBy , ...sortBy }
    return httpService.get(BASE_URL, filterBy)
    .then(toys => {
        //     const toysData ={
        //         allToysCount : toys.length,
        //         doneToysCount : toys.filter(t=>t.isDone).length,
        //         toysToDisplay:[],
        //         pageCount:0
        //     }
            // let toysToDisplay = toys.slice()
            // if (filterBy.name) {
            //     const regExp = new RegExp(filterBy.name, 'i')
            //     toysToDisplay = toysToDisplay.filter(t => regExp.test(t.name))
            // }
            
            // if (filterBy.price) {
            //     toysToDisplay = toysToDisplay.filter(t => t.price <= filterBy.price)
            // }
    
            // if (filterBy.inStock !== 'all') {
            //     toysToDisplay = toysToDisplay.filter(t => t.inStock && filterBy.inStock === 'inStock'
            //     || !t.inStock && filterBy.inStock === 'notInStock')
            // }
    
            // if(filterBy.labels.length !== 0){
            //     toysToDisplay = toysToDisplay.filter(t => {
            //         return filterBy.labels.every(l =>{
            //            return t.labels.includes(l)
            //         })
            //     })
            // }
    
            // if (sortBy.type) {
            //     if(sortBy.type === 'name'){
            //         toysToDisplay.sort(((t1, t2) => t1.name.localeCompare(t2.name) * sortBy.desc))
            //     }else{
            //         console.log('sortBy.type',sortBy.type)
            //         toysToDisplay.sort(((t1, t2) => (t1[sortBy.type] - t2[sortBy.type]) * sortBy.desc))
            //     }
            // } 
        //     const pageCount = Math.ceil(toysToDisplay.length / PAGE_SIZE)
        //     if (filterBy.pageIdx !== undefined) {
        //         let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
        //         toysToDisplay = toysToDisplay.slice(start, start + PAGE_SIZE)
        //     }
        //     toysData.pageCount = pageCount
        //     toysData.toysToDisplay = toysToDisplay
        // return toysToDisplay
        return toys
        })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        inStock: true,
        price: 0,
        labels: []

    }
}


function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], price :''}
}
function getDefaultSort() {
    return { type: '' , desc : 1 }
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


