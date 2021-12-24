import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import {Routes, Route} from "react-router-dom"

function RoutesManager() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default RoutesManager
