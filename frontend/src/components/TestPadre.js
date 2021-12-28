import Test from "./Test"
import {connect} from "react-redux"
import React, {useState, useEffect} from "react"
import authAction from "../redux/actions/authActions"

function TestPadre(props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    !props.personas[0] && props.getUsers(props.user._id)
    props.personas.length > 0 && setLoading(false)
  }, [props.personas])

  return (
    <div>
      {loading && props.personas.length > 0 ? (
        <h1>Loading...</h1>
      ) : (
        <Test
          personas={props.personas}
          matchsAndDismatchs={props.matchsAndDismatchs}
        />
      )}
    </div>
  )
}

const mapDispatchToProps = {
  getUsers: authAction.getUsers,
  matchsAndDismatchs: authAction.matchsAndDismatchs,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    personas: state.authReducer.all,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPadre)
