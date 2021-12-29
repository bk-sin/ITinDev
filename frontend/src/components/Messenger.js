import React, {useEffect, useRef, useState} from "react"
import {connect} from "react-redux"
import axios from "axios"
import {io} from "socket.io-client"
import Conversation from "./Conversation"
import Message from "./Message"

import "./messenger.css"

const Messenger = ({user}) => {
  console.log(user)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [receivedMessage, setReceivedMessage] = useState(null)

  const socket = useRef()
  const scrollRef = useRef()

  useEffect(() => {
<<<<<<< HEAD
    socket.current = io("ws://localhost:8900")
=======
    socket.current = io("ws://localhost:4000");
>>>>>>> 05807bbb5c692e5e6eace4c2b409c1fafef00125
    socket.current.on("getMessage", (data) => {
      setReceivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
    console.log(user)
  }, [])

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage])
  }, [receivedMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        let res = await axios.get(
          "http://localhost:4000/api/conversations/" + user._id
        )
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/messages/${currentChat?._id}`
<<<<<<< HEAD
        )
        console.log(currentChat)
        setMessages(res.data)
=======
        );
        //console.log(currentChat);
        setMessages(res.data);
>>>>>>> 05807bbb5c692e5e6eace4c2b409c1fafef00125
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

<<<<<<< HEAD
    const receiverId = currentChat.members.find((member) => member !== user._id)
=======
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(receiverId);
>>>>>>> 05807bbb5c692e5e6eace4c2b409c1fafef00125

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })
    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages",
        message
      )
      setMessages([...messages, res.data])
    } catch (err) {
      console.log(err)
    }
<<<<<<< HEAD
  }
  console.log(messages)
=======
  };

>>>>>>> 05807bbb5c692e5e6eace4c2b409c1fafef00125
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
          {conversations.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((message) => (
                  <div ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.sender._id === user._id}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitbutton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Abre una conversación para iniciar un chat.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const maspStatetoProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}

export default connect(maspStatetoProps)(Messenger)
