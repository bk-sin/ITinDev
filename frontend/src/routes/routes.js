import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
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

  return (
    <>
    <NavBar/>
    <Routes>
      <Route
        path="/test"
        element={
          !props.user.name ? <Navigate replace to="/signup" /> : <TestPadre />
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
        element={props.user.name ? <Navigate replace to="/test" /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={props.user.name ? <Navigate replace to="/test" /> : <SignUp />}
      />
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
