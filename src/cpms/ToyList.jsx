import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons'

import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {

    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => <li key={toy._id}>
                    <section className="controls">
                    <button className="btn small" onClick={() => {
                        onRemoveToy(toy._id)
                    }}><FontAwesomeIcon icon={faTrash} /></button>
                    <Link className="btn small" to={`/toy/edit/${toy._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                    </section>
    
                    <Link to={`/toy/${toy._id}`}>
                    <ToyPreview toy={toy} />
                     </Link>
                </li>
                )}
            </ul>
        </section>
    )
}