import React from 'react';
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import authActions from '../redux/actions/authActions';

function NavBar() {
    // const usuario = useSelector(state => state.authReducer.usuario)
    // const dispatch = useDispatch()

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



// { usuario.name ?
    // <div className='user-name-container'>
    //     <p className='link-nav'>{usuario.name}</p>
    // </div>
    // : ""
    // } 
    // <div className="dropdown-nav">
    //     {
    //         usuario.url ? 
    //         <> 
    //         <div className='user-url'>
    //             <img src={usuario.url} alt={usuario.name}/>
    //         </div>
    //         <NavDropdown className="link-nav" id="basic-nav-dropdown">
    //             <NavDropdown.Item  as={Link} to="/" onClick={()=> dispatch(authActions.logOut())}>⬅️ Log out</NavDropdown.Item>
    //         </NavDropdown></>
    //     :
    //     <NavDropdown title={<i className="fas fa-user"></i>} className="link-nav" id="basic-nav-dropdown">
    //         <NavDropdown.Item as={Link} to="/signIn">➡️ Log In</NavDropdown.Item>
    //         <NavDropdown.Item as={Link} to="/signUp">👤+ Sign Up </NavDropdown.Item>
    //     </NavDropdown>
    //     }