import React from "react"
import {Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"

function NavBar() {

    return (
        <div className="costumBg" variant="dark">
            <Link to="/" className="logo-container">
                <img src="/logo-mt.png" alt="MyTinerary Logo"></img>
            </Link>
            <div className="links-nav">
                <Nav.Link  as={Link} to="/"  className="link-nav">Home</Nav.Link>
                <Nav.Link as={Link} to="/cities" className="link-nav">Cities</Nav.Link>
            </div>
            <NavDropdown title={<i className="fas fa-user"></i>} className="link-nav" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/signIn">➡️ Log In</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/signUp">👤+ Sign Up </NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}

export default NavBar

