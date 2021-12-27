import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
<<<<<<< HEAD
import {Routes, Route} from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
=======
import Admin from "../components/Admin"
import TestPadre from "../components/TestPadre"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"

import {Routes, Route, Navigate} from "react-router-dom"

function RoutesManager(props) {
  console.log(props)
  !props.user.name && props.tokenDale()
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465

  return (
    <>
    <NavBar/>
    <Routes>
<<<<<<< HEAD
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
=======
      <Route
        path="/test"
        element={
          !props.user.name ? <Navigate replace to="/signup" /> : <TestPadre />
        }
      />

      <Route
        path="/admin"
        element={props.user.admin ? <Admin /> : <Navigate replace to="/test" />}
      />
      <Route
        path="/signin"
        element={props.user.name ? <Navigate replace to="/test" /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={props.user.name ? <Navigate replace to="/test" /> : <SignUp />}
      />
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465
    </Routes>
    <Footer/>
    </>
  )
}
const mapDispatchToProps = {
  tokenDale: authAction.tokenDale,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesManager)
