import {useRef} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import authAction from "../redux/actions/authActions"

function SignIn(props) {
  const email = useRef()
  const password = useRef()

  console.log(props)
  function handleSignIn(e) {
    e.preventDefault()
    props.signinUser(email.current.value, password.current.value)
    email.current.value = ""
    password.current.value = ""
  }

  return (
    <div className="cointainer-all">
      <Link to="/admin">Admin</Link>
      <div className="form-neon">
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            className="btn-signin"
            placeholder="Email"
            ref={email}
            required
          />
          <input
            type="password"
            className="btn-signin"
            placeholder="Password"
            ref={password}
            required
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
