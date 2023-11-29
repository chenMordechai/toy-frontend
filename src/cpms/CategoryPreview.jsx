

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBiking,faCubesStacked, faPuzzlePiece ,faBox, faBorderAll , faPalette , faBaby,faBabyCarriage,faCampground,faBatteryFull} from '@fortawesome/free-solid-svg-icons'

import { toyService } from '../services/toy.service.js'


export function CategoryPreview({category , idx}){
    const categoriesIcons = [faBorderAll,faCubesStacked,faPersonBiking, faBox,faPalette,faBabyCarriage,faBaby, faPuzzlePiece , faCampground , faBatteryFull]
 
    return (
        <section className="category-preview">
            <FontAwesomeIcon icon={categoriesIcons[idx]} />
            {category}

        </section>
    )
}