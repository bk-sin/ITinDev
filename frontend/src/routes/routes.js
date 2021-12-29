import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
<<<<<<< HEAD
<<<<<<< HEAD
import {Routes, Route} from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
=======
=======
>>>>>>> 712b4452295b811633c2b4d37cc505d2a1b9dfc6
import Admin from "../components/Admin"
import TestPadre from "../components/TestPadre"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import Main from "../components/Main"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import {Routes, Route, Navigate} from "react-router-dom"

function RoutesManager(props) {
  console.log(props)
  !props.user.name && props.tokenDale()
<<<<<<< HEAD
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465
=======
>>>>>>> 712b4452295b811633c2b4d37cc505d2a1b9dfc6

  return (
    <>
    <NavBar/>
    <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
=======
=======
>>>>>>> 712b4452295b811633c2b4d37cc505d2a1b9dfc6
      <Route
        path="/test"
        element={
           <TestPadre />
        }
      />
      <Route
      path="/"
      element={<Main/>}/>
      <Route
        path="/admin"
        element={props.user.admin ? <Admin /> : <Navigate replace to="/test" />}
      />
      <Route
        path="/signin"
        element={<SignIn />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
<<<<<<< HEAD
>>>>>>> 82e336f66c7ecf88b2f5759f696960dd679f5465
=======
>>>>>>> 712b4452295b811633c2b4d37cc505d2a1b9dfc6
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
