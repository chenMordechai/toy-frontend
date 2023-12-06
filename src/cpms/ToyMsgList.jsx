

export function ToyMsgList({ msgs, onRemoveToyMsg }) {
    return (
        <section className="toy-msg-list">
            <ul>{msgs.map(m => <li
                key={m.id}>
                <button onClick={() => {
                    onRemoveToyMsg(m.id)
                }} className="btn">x</button>
                {m.txt}
                <span>{m.by.fullname}</span>
            </li>)}</ul>

        </section>
    )
}