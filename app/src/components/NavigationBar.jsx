import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';

function tick() {
    const element = (
        <h3>
            <Badge bg="secondary">{new Date().toLocaleTimeString()}</Badge>
        </h3>
    ); 

    ReactDOM.render(
        element, 
        document.getElementById('clock')
    );
}

setInterval(tick, 1000);

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className='navbar-brand'>RESTful API</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Customers" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/customers">Customers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/add-customer">Add Customer</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav className="ms-auto">
                        <span id="clock"></span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
