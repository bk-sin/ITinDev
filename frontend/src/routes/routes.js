import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import TestPadre from "../components/TestPadre"
import {Routes, Route} from "react-router-dom"

function RoutesManager() {
  return (
    <Routes>
      <Route path="/test" element={<TestPadre />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default RoutesManager
