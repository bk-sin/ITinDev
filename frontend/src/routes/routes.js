import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Admin from "../components/Admin"
import TestPadre from "../components/TestPadre"
import {connect} from "react-redux"
import authAction from "../redux/actions/authActions"
import Main from "../components/Main"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Messenger from "../components/Messenger"
import React from "react"
import {useNavigate} from "react-router-dom"
import {Routes, Route, Navigate} from "react-router-dom"
import Banned from "../components/Banned"

function RoutesManager(props) {
  localStorage.getItem("token") && !props.user.name && props.tokenDale()
  const navigate = useNavigate()
  /* props.user.banned && navigate("/banned", {replace: true}) */
  console.log(props.user)
  return (
    <>
      <NavBar />
      {props.user.banned ? (
        <Routes>
          <Route element={<Banned />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/test"
            element={
              props.user.name ? <TestPadre /> : <Navigate replace to="/" />
            }
          />
          <Route path="/" element={<Main user={props.user} />} />
          <Route path="/admin" element={<Admin user={props.user} />} />
          <Route
            path="/signin"
            element={
              props.user.name ? <Navigate replace to="/test" /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              props.user.name ? <Navigate replace to="/test" /> : <SignUp />
            }
          />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}
const mapDispatchToProps = {
  tokenDale: authAction.tokenDale,
  signOut: authAction.signOut,
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesManager)
