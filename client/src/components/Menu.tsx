import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

import {User} from "../models/user";

function Menu() {
  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">Software Systems</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-nav" />
        <Navbar.Collapse id="menu-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/project">Projects</Nav.Link>
            <Nav.Link as={Link} to="/task">Tasks</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {userData.id
          ? <NavDropdown
            className="justify-content-end"
            title={userData.username}
            id="menu-nav-user"
          >
            <NavDropdown.Item as={Link} to="/user">Cabinet</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/user/logout">Log Out</NavDropdown.Item>
          </NavDropdown>
          : <NavDropdown
            className="justify-content-end"
            title="You are not logged in"
            id="menu-nav-user"
          >
            <NavDropdown.Item as={Link} to="/user/login">Log In</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user/register">Register</NavDropdown.Item>
          </NavDropdown>
        }
      </Container>
    </Navbar>
  );
}

export {Menu};
