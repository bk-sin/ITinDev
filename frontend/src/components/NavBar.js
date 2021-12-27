import React from "react"
import {Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"

function NavBar() {
  return (
    <div className="costumBg" variant="dark">
      <div className="logo-container">
      <Link to="/" >
        <img src="/assets/ItinDev_logo.png" alt="ItinDev_logo"></img>
      </Link>
      <p className="brand">&#x2774; ItinDev &#x2775; </p>
      </div>
      <div className="dropdown-nav">
      <div className="menu-options">
        <Nav.Link as={Link} className="link-nav" to="/">
          Home
        </Nav.Link>
      </div>
      <NavDropdown
        title={<i className="fas fa-user"></i>}
        className="link-nav"
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item as={Link} to="/signin">
          Sign In
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/signup">
          Sing Up
        </NavDropdown.Item>
      </NavDropdown>
      </div>
    </div>
  )
}

export default NavBar
