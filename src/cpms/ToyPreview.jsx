// import logoUrl from '../assets/img/1.jpg'

import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {
    // console.log('toy.labels:', toy.labels)
function getRandomColor(){
    return {
        'background-color': utilService.getRandomColor()
    }
}

    if (!toy) return ''
    return (
        <section className="toy-preview">
            {/* <h4>Id:{toy._id}</h4>
            <h4>{toy.inStock && 'In Stock'}</h4>
        // <h4>Price{toy.price}</h4> */}
            {/* <h4>Labels:</h4> */}
            {/* {toy.labels.map(l => <span key={l}>{l}</span>)} */}
            {/* <img src={utilService.getAssetSrc(toy.imgId)} /> */}
          <div className="img-container" style={{ backgroundColor: utilService.getRandomColor()}}>
            <img src={`/src/assets/img/${toy.imgId}.png`} alt="" />
          </div>
            {/* <img src={logoUrl} /> */}
        <h3>{toy.name}</h3>
        <h4>${toy.price}</h4>
        </section>
    )
}