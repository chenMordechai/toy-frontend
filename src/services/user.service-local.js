
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    query,
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    changeScore
}


async function query() {
    return storageService.query(STORAGE_KEY)
}

async function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    return await storageService.put('user', user)
}


async function login({ username, password }) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')

}

async function signup({ username, password, fullname }) {
    const userToSave = {
        username,
        password,
        fullname,
        isAdmin: false
    }
    const user = await storageService.post(STORAGE_KEY, userToSave)
    return saveLocalUser(user)


}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
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
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}



// Test Data
// userService.signup({username: 'muki', password: '123', fullname: 'Muki M'})
// userService.login({username: 'muki', password: '123'})



