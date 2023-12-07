
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const BASE_URL_USER = 'user/'
const BASE_URL_AUTH = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    query,
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    changeScore,
    getEmptyCredentials
}


async function query() {
    return httpService.get(BASE_URL_USER)
}

async function getById(userId) {
    const user = await httpService.get(BASE_URL_USER + userId)
    return user
}

async function remove(userId) {
    return httpService.delete(BASE_URL_USER + userId)
}

async function update(user) {
    user = await httpService.put(BASE_URL_USER + user._Id, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _setLoggedinUser(user)
    return user
}


async function login(userCred) {
    const user = await httpService.post(BASE_URL_AUTH + 'login', userCred)
    if (user) {
        return _setLoggedinUser(user)
    }
}

async function signup({ username, password, fullname }) {
    const userToSave = {
        username,
        password,
        fullname,
        isAdmin: false,
    }

    const user = await httpService.post(BASE_URL_AUTH + 'signup', userToSave)
    return _setLoggedinUser(user)

}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post(BASE_URL_AUTH + 'logout')

}


async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}



function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const { _id, fullname, isAdmin } = user
    const userToSave = { _id, fullname, isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'chen',
        password: '123',
    }
}




// Test Data
// userService.signup({username: 'muki', password: '123', fullname: 'Muki M'})
// userService.login({username: 'muki', password: '123'})



