import "./css.css"
import {BrowserRouter} from "react-router-dom"
import RoutesManager from "./routes/routes"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import "./components/Test.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer autoClose={5000} />
      <RoutesManager />
      <Footer />
    </BrowserRouter>
  )
}

export default App
