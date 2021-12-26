import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import authActions from '../redux/actions/authActions';

function NavBar() {
    // const usuario = useSelector(state => state.authReducer.usuario)
    // const dispatch = useDispatch()

    return (
        <div lassName="costumBg" variant="dark">
            {/* <Link to="/" className="logo-container">
                <img src="/logo-mt.png" alt="MyTinerary Logo"></img>
            </Link>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title={<i className="fas fa-user"></i>} className="link-nav" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Sing Up</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse> */}
        </div>
    )
}

export default NavBar