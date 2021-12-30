import React from "react"
import {Nav} from "react-bootstrap"
import {Link} from "react-router-dom"

function Footer() {
  return (
    <footer>
      <div className="footer-nav" variant="dark">
        <div className="icons-container">
          <Nav.Link
            href="https://github.com/bk-sin/ITinDev"
            target="blank"
            className="link-social"
          >
            <i className="fab fa-github" id="github"></i>
          </Nav.Link>
        </div>
        <p>&copy; ItinDev | All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
