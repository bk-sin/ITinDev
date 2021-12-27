import {useRef} from "react"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import GoogleLogin from "react-google-login"

function SignUp(props) {
  localStorage.getItem("token") && !props.token && props.tokenDale()

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
        </div>
  )


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
