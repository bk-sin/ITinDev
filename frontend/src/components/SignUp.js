import {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import GoogleLogin from "react-google-login"

function SignUp(props) {
  localStorage.getItem("token") && !props.token && props.tokenDale()

<<<<<<< HEAD
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err))
  }, [])

  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    country: "",
    edad: "",
    email: "",
    image: "",
    password: "",
    gender:"",
  })

  const inputHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
=======
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
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465
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
<<<<<<< HEAD
    <div className="cointainer-all">
      <div className="form-neon">
        <form action="" method="">
          <div className="inputs-container">
            <h2>Register account 🚀</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={inputHandler} />
            <p className="text-danger">{errorInput.name}</p>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={inputHandler}
            />
            <p className="text-danger">{errorInput.lastName}</p>
            <div className="select-container">
              <p>Country:</p>
              <select
                name="country"
                id="country-select"
                onChange={inputHandler}
              >
                <option defaultValue value="Choose one">
                  Choose one
                </option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-container">
            <p>Genero:</p>
            <select
            name="gender"
            id="gender-select"
            onChange={inputHandler}
            >
              <option defaultValue value="Choose one">
                Choose one
              </option>
              <option key="0" value="Femenino" >
                    Femenino
              </option>
              <option key="1" value="Masculino" >
                    Masculino
              </option>
              <option key="2" value="otro">
                    Otro
              </option>
            </select>
            </div>
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              name="edad"
              id="edad"
              onChange={inputHandler}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={inputHandler}
            />
            <p className="text-danger">{errorInput.email}</p>
            <label htmlFor="url">URL Photo:</label>
            <input type="url" name="url" id="url" onChange={inputHandler} />
            <p className="text-danger">{errorInput.url}</p>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={inputHandler}
            />
            <p className="text-danger">{errorInput.password}</p>
            <div className="ppal-btn">
              <Link to="/" className="btn-form" onClick={(e) => submitForm(e)}>
                Sign Up
              </Link>
              <Link to={"/"}>
                {/* <GoogleLogin
                  clientId="364580156359-glg6vkvjvnag4e7ldm36478tge8h4qft.apps.googleusercontent.com"
                  buttonText="Sign Up with Goolge"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                /> */}
              </Link>
            </div>
          </div>
          <div className="btns-container">
            <p>
              explore the world with <b>Mytineraries</b>
            </p>
            <Link to="/" className="logo-form">
              <img src="/logo-mt.png" alt="MyTinerary Logo"></img>
            </Link>
            <div className="signUp">
              <p>Already have an account?</p>
              <Link as={Link} to="/signIn" className="btn-form">
                Sign In
              </Link>
            </div>
=======
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
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465
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
