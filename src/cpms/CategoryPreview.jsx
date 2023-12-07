import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBiking, faCubesStacked, faPuzzlePiece, faBox, faBorderAll, faPalette, faBaby, faBabyCarriage, faCampground, faBatteryFull } from '@fortawesome/free-solid-svg-icons'


export function CategoryPreview({ category, idx, onSetCategory }) {
    const categoriesIcons = [faBorderAll, faCubesStacked, faPersonBiking, faBox, faPalette, faBabyCarriage, faBaby, faPuzzlePiece, faCampground, faBatteryFull]

    return (
        <section onClick={() => {
            onSetCategory(category)
        }} className="category-preview">
            <FontAwesomeIcon icon={categoriesIcons[idx]} />
            {category}
        </section>
    )
}