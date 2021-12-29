import React from "react"
import {Link} from "react-router-dom"

function Main(props) {
  return (
    <>
      <div className="container_principal">
        <div className="container_cuenta">
          <h1 className="titulo_principal">
            Encontrá con quien hablar un mismo lenguaje
          </h1>
          <Link as={Link} to="/signup" className="custom-btn btn-5">
            {props.user.name ? "LOVE" : "Crea tu cuenta"}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Main
