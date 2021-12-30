import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "./Conversation";
import Message from "./Message";

import "./messenger.css";

const Messenger = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("getMessage", (data) => {
      setReceivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    console.log(user);
  }, []);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        let res = await axios.get(
          "http://localhost:4000/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/messages/${currentChat?._id}`
        );
        //console.log(currentChat);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(receiverId);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
    setNewMessage("");
  };

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
                    {console.log(message.sender)}
                    <Message
                      message={message}
                      own={message.sender === user._id}
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
                  onKeyPress={(e) => {
                    e.key === "Enter" && handleSubmit(e);
                  }}
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
  );
};

const maspStatetoProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(maspStatetoProps)(Messenger);
