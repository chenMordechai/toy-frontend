

export function Label({ labels, label, idx, handleLabelChange }) {

    const isChecked = labels.includes(label)
    return (
        <li>
            <label htmlFor={idx}>{label}</label>
            <input onChange={handleLabelChange} name={label} type="checkbox" checked={isChecked} id={idx} />
        </li>
    )
}