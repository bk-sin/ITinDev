import {Link} from "react-router-dom"

const SignUp = (props) => {
  return (
    <div className="cointainer-all">
      <div className="form-neon">
        <form action="" method="">
          <div className="inputs-container">
            <h2>Register account 🚀</h2>
            <label htmlFor="name">Name:</label>
            {/* <input type="text" name="name" id="name" onChange={inputHandler} />
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
              </Link> */}
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
        </form>
      </div>
    </div>
  )
}

export default SignUp
/* const mapStateToProps = (state) => {
  return {
    name: state.authReducer.name,
  }
}

const mapDispatchToProps = {
  signUp: authActions.signUp,
} */

/* export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
 */
