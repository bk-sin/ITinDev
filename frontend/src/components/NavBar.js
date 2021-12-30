import React from "react"
import {Nav, NavDropdown} from "react-bootstrap"
import {Link, useLocation} from "react-router-dom"
import authAction from "../redux/actions/authActions"
import {connect} from "react-redux"

function NavBar(props) {
  let location = useLocation()
  return (
    <div className="costumBg" variant="dark">
      <div
        className={`logo-container ${
          location.pathname === "/buscar" && "ocultar"
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
              <Nav.Link as={Link} className="link-nav" to="/buscar">
                BUSCAR
              </Nav.Link>
              <Nav.Link as={Link} className="link-nav" to="/messenger">
                CHAT
              </Nav.Link>
            </>
          )}
        </div>
        {props.user.name ? (
          <NavDropdown
            title={
              <img
                className="user-url"
                src={props.user.image}
                alt="user profile pic"
              />
            }
            className="link-nav"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/"
              onClick={() => {
                props.signOut()
              }}
            >
              ⬅️ Sign Out
            </NavDropdown.Item>
            {props.user.admin && (
              <NavDropdown.Item as={Link} to="/admin">
                🔐 Admin Panel
              </NavDropdown.Item>
            )}
          </NavDropdown>
        ) : (
          <NavDropdown
            title={<i className="fas fa-user"></i>}
            className="link-nav"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/signin">
              ➡️ Sign In
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signup">
              👤+ Sing Up
            </NavDropdown.Item>
          </NavDropdown>
        )}
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
