import {useRef} from "react"
import {connect} from "react-redux"
import {BsEmojiLaughing} from "react-icons/bs"
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
      <div className="form-neon">
        <form className="formSignIn" onSubmit={handleSignIn}>
        <p>👋 BIENVENIDO!</p>
          <div>
          <input
            type="text"
            className="input-signin"
            placeholder="Email"
            ref={email}
            required
          />
          <input
            type="password"
            className="input-signin"
            placeholder="Password"
            ref={password}
            required
          />
          </div>
          <button class="custom-signIn btn-signIn" type="submit" value="Sign in">
            <span>
              Iniciar
            </span>
        </button>
        </form>
        <div className="contenedor-registro">
        <p>Aun no estás Registrado?</p>
        <button className="custom-signUp btn-signUp" type="submit" value="Sign in">
            <span>
              Registrate
            </span>
        </button>
        </div>
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
