import Test from "./Test"
import {connect} from "react-redux"
import React, {useState, useEffect} from "react"
import authAction from "../redux/actions/authActions"

function TestPadre(props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    !props.personas[0] && props.getUsers()
    props.personas.length > 0 && setLoading(false)
  }, [props.personas])

  return (
    <div>
      {loading && props.personas.length > 0 ? (
        <h1>Loading...</h1>
      ) : (
        <Test personas={props.personas} />
      )}
    </div>
  )
}

const mapDispatchToProps = {
  getUsers: authAction.getUsers,
}
const mapStateToProps = (state) => {
  return {
    personas: state.authReducer.all,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPadre)
