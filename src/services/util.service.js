import {CLOUD_NAME , UPLOAD_PRESET} from '../../dist/pass.js'

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    getAssetSrc,
    getRandomColor,
    uploadImgToCloudinary,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}



function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}



// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function getAssetSrc(name) {
    return new URL(`/src/assets/img/${name}.png`, import.meta.url).href

}

function getRandomColor() {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}

async function uploadImgToCloudinary(ev){
        //Defining our variables
        console.log('CLOUD_NAME:', CLOUD_NAME)
        console.log('UPLOAD_PRESET:', UPLOAD_PRESET)

        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData()
      
        // //Bulding the request body
        FORM_DATA.append('file', ev.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)
      
        // // Sending a post method request to Cloudinarys API
      
        try {
          const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA,
          })
        //   const elImg = document.createElement('img')
          const { url } = await res.json()
          return url
        //   elImg.src = url
        //   document.body.append(elImg)
        } catch (err) {
          console.error(err)
        }
}