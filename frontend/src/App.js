import "./css.css"
import {BrowserRouter} from "react-router-dom"
import RoutesManager from "./routes/routes"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      <RoutesManager />
    </BrowserRouter>
  )
}

export default App
