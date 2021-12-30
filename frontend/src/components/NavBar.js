import React from "react"
import {Nav, NavDropdown} from "react-bootstrap"
import {Link, useLocation} from "react-router-dom"
import authAction from "../redux/actions/authActions"
import {connect} from "react-redux"

function NavBar(props) {
  let location = useLocation()
  console.log(location)
  return (
    <div className="costumBg" variant="dark">
      <div
        className={`logo-container ${
          location.pathname === "/test" && "ocultar"
        }`}
      >
        <Link to="/">
          <img src="/assets/ItinDev_logo.png" alt="ItinDev_logo"></img>
        </Link>
        <p className="brand">&#x2774; ItinDev &#x2775; </p>
      </div>
      <div className="dropdown-nav">
        <div className="menu-options">
          <Nav.Link as={Link} className="link-nav" to="/">
            HOME
          </Nav.Link>
          {props.user.name && (
            <>
              <Nav.Link as={Link} className="link-nav" to="/test">
                BUSCA
              </Nav.Link>
              <Nav.Link as={Link} className="link-nav" to="/messenger">
                CHAT
              </Nav.Link>
            </>
          )}
        </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
