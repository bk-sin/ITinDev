import "./css.css"
import {BrowserRouter} from "react-router-dom"
import RoutesManager from "./routes/routes"

function App() {
  return (
    <BrowserRouter>
      <RoutesManager />
    </BrowserRouter>
  )
}

export default App
