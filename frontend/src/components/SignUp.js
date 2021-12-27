import {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import GoogleLogin from "react-google-login"

function SignUp(props) {
  localStorage.getItem("token") && !props.token && props.tokenDale()

  const responseGoogle = (res) => {
    props.signupUser(
      res.profileObj.email,
      res.profileObj.googleId,
      res.profileObj.givenName,
      res.profileObj.familyName,
      res.profileObj.imageUrl,
      "Argentina",
      true
    )
  }

  const email = useRef()
  const password = useRef()
  const name = useRef()
  const lastname = useRef()
  const photo = useRef()
  const country = useRef()
  const age = useRef()
  const gender = useRef()

  function handleSignUp(e) {
    e.preventDefault()

    props.signupUser(
      name.current.value,
      lastname.current.value,
      country.current.value,
      email.current.value,
      age.current.value,
      password.current.value,
      gender.current.value,
      photo.current.value,
      "false"
    )

    email.current.value = ""
    password.current.value = ""
    name.current.value = ""
    lastname.current.value = ""
    photo.current.value = ""
    country.current.value = ""
    age.current.value = ""
    gender.current.value = ""
  }

  return (
    <div className="signMain">
      <div className="signBody">
        <div className="signLine"></div>
        <div className="backMyTinerary  su">
          <div className="backForm">
            <p className="signUp signP">Sign up MyTinerary now</p>
            <form className="formSignUp" onSubmit={handleSignUp}>
              <div className="labelsInputs">
                <div className="name inputlabel">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="btn-signup"
                    ref={name}
                    required
                    minlength="3"
                    maxlength="20"
                  ></input>
                </div>

                <div className="name inputlabel">
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    className="btn-signup"
                    ref={lastname}
                    required
                    minlength="3"
                    maxlength="20"
                  ></input>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="btn-signup"
                    ref={email}
                    required
                  ></input>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="btn-signup"
                    ref={password}
                    required
                    minlength="8"
                    maxlength="20"
                  ></input>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="photo">Photo</label>
                  <input
                    type="string"
                    id="photo"
                    className="btn-signup"
                    required
                    ref={photo}
                  ></input>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    className="btn-signup"
                    required
                    ref={age}
                  ></input>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="gender">Gender</label>
                  <select
                    type="string"
                    id="gender"
                    className="btn-signup"
                    required
                    ref={gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="name inputlabel">
                  <label htmlFor="country">Country</label>
                  <select
                    type="text"
                    id="country"
                    className="btn-signup"
                    ref={country}
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Chile">Chile</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Peru">Peru</option>
                  </select>
                </div>
              </div>
              <input
                type="submit"
                className="btn-signup Submit2"
                value="Sign up"
              />
              <GoogleLogin
                clientId="113911854537-8j68k30a4qpl884ffcvk7hvdfmsdlfnc.apps.googleusercontent.com"
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className="google-btn"
                cookiePolicy={"single_host_origin"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  signupUser: authAction.signupUser,
  tokenDale: authAction.tokenDale,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    token: state.authReducer.token,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
