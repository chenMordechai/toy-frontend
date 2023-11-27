import { Link } from "react-router-dom";

import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => <li key={toy._id}>
                    <ToyPreview toy={toy} />

                    <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                    <button onClick={() => {
                        onRemoveToy(toy._id)
                    }}>Delete</button>

                </li>
                )}
            </ul>
        </section>
    )
}