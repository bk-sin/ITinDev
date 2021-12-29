import {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import GoogleLogin from "react-google-login"

function SignUp(props) {
  localStorage.getItem("token") && !props.token && props.tokenDale()

  const responseGoogle = (res) => {
    props.signupUser(
      res.profileObj.givenName,
      res.profileObj.familyName,
      "Argentina",
      res.profileObj.email,
      "18",
      res.profileObj.googleId,
      "male",
      res.profileObj.imageUrl,
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
  const description = useRef()

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
      "false",
      description.current.value
    )

    email.current.value = ""
    password.current.value = ""
    name.current.value = ""
    lastname.current.value = ""
    photo.current.value = ""
    country.current.value = ""
    age.current.value = ""
    gender.current.value = ""
    description.current.value = ""
  }
  console.log(props.user)
  return (
    <div className="cointainer-all">
      <div className="form-neon-signUp">
        <p className="signUp signP">👉 Registrate!</p>
        <form className="formSignUp" onSubmit={handleSignUp}>
          <div className="container-inputs-signup">
            <div className="container-inputs-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="inputs-btn"
                ref={name}
                required
                minLength="3"
                maxLength="20"
              ></input>
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                className="inputs-btn"
                ref={lastname}
                required
                minLength="3"
                maxLength="20"
              ></input>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="inputs-btn"
                ref={email}
                required
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="inputs-btn"
                ref={password}
                required
                minLength="8"
                maxLength="20"
              ></input>
            </div>
            <div className="container-inputs-2">
              <label htmlFor="photo">Photo</label>
              <input
                type="string"
                id="photo"
                className="btn-signup"
                required
                ref={photo}
              ></input>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="inputs-btn"
                required
                ref={age}
              ></input>
              <label htmlFor="gender">Gender</label>
              <select
                type="string"
                id="gender"
                className="inputs-btn"
                required
                ref={gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="country">Country</label>
              <select
                type="text"
                id="country"
                className="inputs-btn"
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
              <label htmlFor="age">Description</label>
              <textarea
                id="description"
                className="inputs-btn"
                required
                ref={description}
              ></textarea>
            </div>
          </div>
        </form>
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
