import  { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC ,SOCKET_EVENT_IS_TYPING,SOCKET_EVENT_SHOW_TYPING} from '../services/socket.service'


export function ChatRoom({onCloseChat,topic}) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [fullnameTyping, setFullnameTyping] = useState(null)

    const {loggedinUser} = useSelector(storeState => storeState.userModule)

    
    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_SHOW_TYPING, showIsTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_SHOW_TYPING)
        }
    }, [])
    
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function showIsTyping(fullname){
        console.log(fullname , 'is typing')
        setFullnameTyping(fullname)
    }
    
    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }
    
    function sendMsg(ev) {
        ev.preventDefault()
        const user = {_id : loggedinUser._id,fullname:null }
        socketService.emit(SOCKET_EVENT_IS_TYPING,user)
        const from = loggedinUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
       
    }

    function handleFormChange(ev) {
        const fullname = loggedinUser?.fullname || 'Me'
        const user = {
            _id : loggedinUser._id,
            fullname
        }
        socketService.emit(SOCKET_EVENT_IS_TYPING,user)
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function getClassName(name){
       return (name === loggedinUser.fullname)?'user': ''
}

    return (
        <section className="chat-room">
            <button className="btn" onClick={onCloseChat}>x</button>
            <ul>
                {msgs.map((msg, idx) => (<li className={getClassName(msg.from)}
                 key={idx}>
                    {(msg.from === loggedinUser.fullname)?'': msg.from+':'} {msg.txt}
                    </li>
                    ))}
                    {fullnameTyping && <li>{fullnameTyping} is typing...</li>}
            </ul>


            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button className="btn ">Send</button>
            </form>
        
        </section>
    )
}