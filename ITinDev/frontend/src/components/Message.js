import React from "react"
import {format, register} from "timeago.js"
import "./message.css"

const Message = ({message, own}) => {
  register(
    "es_ES",
    (number, index, total_sec) =>
      [
        ["justo ahora", "ahora mismo"],
        ["hace %s segundos", "en %s segundos"],
        ["hace 1 minuto", "en 1 minuto"],
        ["hace %s minutos", "en %s minutos"],
        ["hace 1 hora", "en 1 hora"],
        ["hace %s horas", "in %s horas"],
        ["hace 1 dia", "en 1 dia"],
        ["hace %s dias", "en %s dias"],
        ["hace 1 semana", "en 1 semana"],
        ["hace %s semanas", "en %s semanas"],
        ["1 mes", "en 1 mes"],
        ["hace %s meses", "en %s meses"],
        ["hace 1 año", "en 1 año"],
        ["hace %s años", "en %s años"],
      ][index]
  )

  const timeago = (timestamp) => format(timestamp, "es_ES")

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={message.sender.image} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timeago(message.createdAt)}</div>
    </div>
  )
}

export default Message
