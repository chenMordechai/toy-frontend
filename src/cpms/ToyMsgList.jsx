

export function ToyMsgList({ msgs }) {
    return (
        <section className="toy-msg-list">
            <ul>{msgs.map(m => <li
                key={m.id}>{m.txt}
                <span>{m.by.fullname}</span>
            </li>)}</ul>

        </section>
    )
}