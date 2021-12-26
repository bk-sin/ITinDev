import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import {Routes, Route} from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

function RoutesManager() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default RoutesManager
