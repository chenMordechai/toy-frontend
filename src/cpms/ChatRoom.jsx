import  { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export function ChatRoom({onCloseChat}) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])

    const {loggedinUser} = useSelector(storeState => storeState.userModule)
console.log('loggedinUser:', loggedinUser)
    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedinUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        console.log('newMsg:', newMsg)
        // socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat-room">
            <button className="btn" onClick={onCloseChat}>x</button>
        
            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button className="btn ">Send</button>
            </form>
        
        </section>
    )
}