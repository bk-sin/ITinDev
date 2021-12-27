import React from "react"
import {Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"

function NavBar() {
  return (
    <div className="costumBg" variant="dark">
      <Link to="/" className="logo-container">
        <img src="/assets/ItinDev_logo.png" alt="ItinDev_logo"></img>
      </Link>
      <p>ItinDev</p>
      <div>
        <Nav.Link as={Link} className="link-nav" to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} className="link-nav" to="#link">
          Link
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
  )
}

export default NavBar
