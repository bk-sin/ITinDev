import Test from "./Test"
import {connect} from "react-redux"
import React, {useState, useEffect} from "react"
import authAction from "../redux/actions/authActions"

function TestPadre(props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    props.personas === "" && props.getUsers(props.user._id)
    props.personas.length > 0 && setLoading(false)
  }, [props.personas])
  useEffect(() => {
    props.getUsers(props.user._id)
  }, [])
  return (
    <div>
      {loading && props.personas === "" && localStorage.getItem("token") ? (
        <h1>Loading...</h1>
      ) : (
        <Test
          personas={props.personas}
          user={props.user}
          match={props.match}
          newConver={props.newConversation}
          matchsAndDismatchs={props.matchsAndDismatchs}
        />
      )}
    </div>
  )
}

const mapDispatchToProps = {
  getMatchUsers: authAction.getMatchUsers,
  getUsers: authAction.getUsers,
  matchsAndDismatchs: authAction.matchsAndDismatchs,
  newConversation: authAction.newConversation,
  getConversation: authAction.getConversation,
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.authReducer.user,
    test: state.authReducer.test,
    personas: state.authReducer.all,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPadre)
