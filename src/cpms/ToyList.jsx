import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ToyPreview } from "./ToyPreview"

export function ToyList({loggedinUser, toys, onRemoveToy, addToCart }) {

    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => <li key={toy._id}>
                    {loggedinUser?.isAdmin && <section className="controls">
                        <button className="btn small" onClick={() => {
                            onRemoveToy(toy._id)
                        }}><FontAwesomeIcon icon={faTrash} /></button>
                        <Link className="btn small" to={`/toy/edit/${toy._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                    </section>}

                    <Link to={`/toy/${toy._id}`}>
                        <ToyPreview toy={toy} />
                    </Link>
                   {loggedinUser && <button className="btn-add" onClick={() => addToCart(toy)}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    </button>}
                </li>
                )}
            </ul>
        </section>
    )
}