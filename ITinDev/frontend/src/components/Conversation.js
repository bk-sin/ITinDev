import React, {useEffect, useState} from "react"
import axios from "axios"
import "./conversation.css"

const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    )
    //console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/${friendId}`
        )
        setUser(res.data.res)
        //console.log(user);
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.image ? user.image : "nn"}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  )
}

export default Conversation
