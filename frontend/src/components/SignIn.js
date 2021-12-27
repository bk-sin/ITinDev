import {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"

function SignIn(props) {
  const email = useRef()
  const password = useRef()

  console.log(props)
  function handleSignIn(e) {
    e.preventDefault()
    console.log("hola")
    props.signinUser(email.current.value, password.current.value)
    email.current.value = ""
    password.current.value = ""
  }

  return (
    <div className="cointainer-all">
      <div className="form-neon">
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            className="btn-signin"
            placeholder="Email"
            ref={email}
            required="true"
          />
          <input
            type="password"
            className="btn-signin"
            placeholder="Password"
            ref={password}
            required="true"
          />
          <input type="submit" value="Sign in" className="btn-signin Submit" />
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  signupUser: authAction.signupUser,
  signinUser: authAction.signinUser,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
