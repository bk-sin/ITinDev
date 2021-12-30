import {connect} from "react-redux"
import {useNavigate} from "react-router-dom"
import User from "./User"
import {useEffect, useState} from "react"
import authAction from "../redux/actions/authActions"
import adminAction from "../redux/actions/adminActions"

function Admin(props) {
  const navigate = useNavigate()
  const [ascdes, setascdes] = useState("DEFAULT")

  useEffect(() => {
    props.getAllUsers()
  }, [])

  useEffect(() => {
    props.personas === "" &&
      props.personas === "Oops!error" &&
      props.getAllUsers()
    props.personas !== "" &&
      props.personas !== "Oops!error" &&
      props.setPersonas()
  }, [props.personas])

  return (
      <>
      {!props.user.name ? (
        <h1>Loading...</h1>
      ) : !props.user.admin ? (
        navigate("/", {replace: true})
      ) : (
        <div className="contenedor-admin-page">
            <div className="usuarios-admin-filters">
              <h3>Hola {props.user.name}! 👋</h3>
              <h2>Administrador de usuarios:</h2>
              <div className="filter-conteiner">
                <button
                  onClick={() => {
                    props.setPersonas(ascdes)
                    props.filterPeople()
                    setascdes(ascdes === "ASC" ? "DES" : "ASC")
                  }}
                >
                  Ordenar alfabéticamente
                </button>
                <input
                  className="SearchInput"
                  onChange={(e) => props.filterPeople(e.target.value)}
                  type="text"
                  placeholder="Busca un usuario"
                />
              </div>
            </div>
            <div className="usuarios-admin-conteiner">
              {props.personas !== "Oops!error" &&
                props.auxiliar.map((character, index) => (
                  <User
                    key={index}
                    index={index}
                    user={character}
                    deletePeople={props.deletePeople}
                    editPeople={props.editPeople}
                    getAllUsers={props.getAllUsers}
                    banPeople={props.banPeople}
                  />
                ))}
            </div>
        </div>
      )}
    </>
  )
}
const mapDispatchToProps = {
  getAllUsers: authAction.getAllUsers,
  setPersonas: adminAction.setPersonas,
  deletePeople: adminAction.deletePeople,
  editPeople: adminAction.editPeople,
  banPeople: adminAction.banPeople,
  filterPeople: adminAction.filterPeople,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    personas: state.authReducer.all,
    auxiliar: state.authReducer.auxiliar,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
