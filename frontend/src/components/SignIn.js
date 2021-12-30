import {useRef} from "react"
import {connect} from "react-redux"
import {useNavigate} from "react-router-dom"
import authAction from "../redux/actions/authActions"
import GoogleLogin from "react-google-login"

function SignIn(props) {
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()

  const responseGoogle = (response) => {
    props.signinUser(
      response.profileObj.email,
      response.profileObj.googleId,
      true
    )
  }

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
          <div className="conteiner-btns-signin">
            <button
              className="custom-signIn btn-signIn"
              type="submit"
              value="Sign in"
            >
              <span>Iniciá</span>
            </button>
            <GoogleLogin
              clientId="773392097856-hbh7oh9am9qlqmeclba343n6lk7s94uc.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="custom-signIn btn-signIn"
                  disabled={renderProps.disabled}
                >
                  Iniciá con Google
                </button>
              )}
              buttonText="Iniciá con Google a ITinDev"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
        <div className="contenedor-registro">
          <p>Aun no estás Registrado?</p>
          <button
            className="custom-signUp btn-signUp"
            type="submit"
            value="Sign in"
            onClick={() => navigate("/signup", {replace: true})}
          >
            <span>Registrate</span>
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
