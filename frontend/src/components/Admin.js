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
        <>
          <h1>Admin Panel</h1>
          <h2>Welcome {props.user.name}</h2>
          <ul>
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
                  giveRemoveAdmin={props.giveRemoveAdmin}
                />
              ))}
          </ul>
          <button
            onClick={() => {
              props.setPersonas(ascdes)
              props.filterPeople()
              setascdes(ascdes === "ASC" ? "DES" : "ASC")
            }}
          >
            Alfabetico
          </button>
          <input
            className="SearchInput"
            onChange={(e) => props.filterPeople(e.target.value)}
            type="text"
            placeholder="Search a City"
          />
        </>
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
  giveRemoveAdmin: adminAction.giveRemoveAdmin,
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
