

export function ToyPreview({ toy }) {
    // console.log('toy.labels:', toy.labels)
    if(!toy) return ''
    return (
        <section className="toy-preview">
            <h2>Name:{toy.name}</h2>
            <h4>Id:{toy._id}</h4>
            <h4>{toy.inStock && 'In Stock'}</h4>
            <h4>Price{toy.price}</h4>
            <h4>Labels:</h4>
                {toy.labels.map(l=><span key={l}>{l}</span>)}
        </section>
    )
}