
import { httpService } from './http.service.js'
const BASE_URL = 'review/'

export const reviewService = {
    query,
    getById,
    save,
    // remove,
    getEmptyReview,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy, sortBy) {
    filterBy = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterBy)
}

async function getById(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}


function save(review) {
    return httpService.post(BASE_URL, review)
}

function getEmptyReview() {
    return {
        txt: ''
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        aboutToyId: '',
        byUserId: ''
    }
}
function getDefaultSort() {
    return {
        type:'',
        desc:1
    }
}
