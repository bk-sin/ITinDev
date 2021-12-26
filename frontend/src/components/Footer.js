import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="footer-nav" variant="dark">
            <div className="links-nav">
                <Nav.Link  as={Link} to={"/"}  className="link-nav">Home</Nav.Link>
                <Nav.Link as={Link} to={"/Cities"} className="link-nav">Cities</Nav.Link>
            </div>
        </div>
            <div className="icons-container">
                <Nav.Link href="/" className="link-social"><i className="fab fa-telegram-plane" id="telegram"></i></Nav.Link>
                <Nav.Link href="/" className="link-social"><i className="fa fa-twitter" id="twitter"></i></Nav.Link>
                <Nav.Link href="/" className="link-social"><i className="fab fa-github" id="github"></i></Nav.Link>
                <Nav.Link href="/" className="link-social"><i className="fab fa-facebook-f" id="facebook"></i></Nav.Link>
            </div>
            <p>&copy; ITindev | All Rights Reserved</p>
        </footer>
    )
}

export default Footer
