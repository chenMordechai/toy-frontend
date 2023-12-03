
import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {

    if (!toy) return ''
    return (
        <section className="toy-preview">
          <div className="img-container" style={{ backgroundColor: utilService.getRandomColor()}}>
          <img src={utilService.getAssetSrc(toy.imgId)} alt="" />

            {/* <img src={`/src/assets/img/${toy.imgId}.png`} alt="" /> */}
          </div>
        <h3>{toy.name}</h3>
        <h4>${toy.price}</h4>
        </section>
    )
}