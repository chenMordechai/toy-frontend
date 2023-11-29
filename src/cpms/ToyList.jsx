import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons'

import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {

    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => <li key={toy._id}>
                    {/* <Link className="btn small" to={`/toy/edit/${toy._id}`}>Edit</Link>
                    <button className="btn small" onClick={() => {
                        onRemoveToy(toy._id)
                    }}>Delete</button> */}
                    <section className="controls">
                    <FontAwesomeIcon icon={faTrash} />
                    <FontAwesomeIcon icon={faPenToSquare} />
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