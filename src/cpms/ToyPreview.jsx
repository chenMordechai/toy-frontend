import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {

    if (!toy) return ''
    return (
        <section className="toy-preview">
          <div className="img-container" style={{ backgroundColor: utilService.getRandomColor()}}>
          <img src={toy.imgUrl} alt="" />

          {/* <img src={utilService.getAssetSrc(toy.imgUrl)} alt="" /> */}
            {/* <img src={`/src/assets/img/${toy.imgUrl}.png`} alt="" /> */}
          </div>
        <h3>{toy.name}</h3>
        <h4>${toy.price}</h4>
        </section>
    )
}