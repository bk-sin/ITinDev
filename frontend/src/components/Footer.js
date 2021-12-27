import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="footer-nav" variant="dark">
                <div className="icons-container">
                    <Nav.Link href="/" className="link-social"><i className="fab fa-github" id="github"></i></Nav.Link>
                </div>
            </div>
            <div className="links-nav">
                <Nav.Link  as={Link} to={"/"}  className="link-nav">Home</Nav.Link>
                <Nav.Link as={Link} to={"/"} className="link-nav">Sign In</Nav.Link>
                <Nav.Link as={Link} to={"/"} className="link-nav">Sign Up</Nav.Link>
            </div>
            <p>&copy; ITindev | All Rights Reserved</p>
        </footer>
    )
}

export default Footer
