

export function ToyMsgList({ msgs, onRemoveToyMsg, loggedinUser }) {
    return (
        <section className="toy-msg-list">
            <h3>Messages:</h3>
            <ul>{msgs.map(m => <li
                key={m.id}>
                {loggedinUser?.isAdmin && <button onClick={() => {
                    onRemoveToyMsg(m.id)
                }} className="btn">x</button>}
                {m.txt}
                <span>{m.by.fullname}</span>
            </li>)}</ul>

        </section>
    )
}