import  { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC ,SOCKET_EVENT_TYPING,SOCKET_EVENT_STOP_TYPING,SOCKET_EMIT_TYPING,SOCKET_EMIT_STOP_TYPING} from '../services/socket.service'


export function ChatRoom({onCloseChat,topic , history}) {
    console.log('history:', history)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(history || [])
    const [typingUser, setTypingUser] = useState(null)

    const {loggedinUser} = useSelector(storeState => storeState.userModule)

    const timeoutId = useRef()

    useEffect(() => {
        // Join room
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
        // Add listeners
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_TYPING, showTyping)
        socketService.on(SOCKET_EVENT_STOP_TYPING, removeTypingUser)

         // Remove on unmount
        return () => {
            socketService.off(SOCKET_EMIT_SEND_MSG, addMsg)
            socketService.off(SOCKET_EMIT_TYPING, showTyping)
            socketService.off(SOCKET_EMIT_STOP_TYPING, removeTypingUser)

            clearTimeout(timeoutId.current)
        }
    }, [])
          
  
    function showTyping(fullname){
        console.log(fullname , 'is typing')
        setTypingUser(fullname)
    }
    function removeTypingUser(){
        console.log('removeTyping user')
        setTypingUser(null)
    }
    
    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }
    
    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedinUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
      
        socketService.emit(SOCKET_EMIT_STOP_TYPING, from)

        clearTimeout(timeoutId.current)
        timeoutId.current = null
        setMsg({ txt: '' })
       
    }

    function handleFormChange(ev) {
        const user = {
            _id : loggedinUser._id,
            fullname :loggedinUser?.fullname || 'Guest'
        }
        if (!timeoutId.current) socketService.emit(SOCKET_EMIT_TYPING,user)
        if (timeoutId.current) clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
            console.log('settimeout')
            socketService.emit(SOCKET_EMIT_STOP_TYPING, user)
            timeoutId.current = null
          }, 2000);

        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function getClassName(name){
       return (name === loggedinUser.fullname)?'user': ''
}

    return (
        <section className="chat-room">
            <button className="btn" onClick={()=> onCloseChat(msgs)
            }>x</button>
            <ul>
                {msgs.map((msg, idx) => (<li className={getClassName(msg.from)}
                 key={idx}>
                    {(msg.from === loggedinUser.fullname)?'': msg.from+':'} {msg.txt}
                    </li>
                    ))}
                    {typingUser && <li>{typingUser} is typing...</li>}
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