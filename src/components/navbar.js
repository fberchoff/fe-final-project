import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import Navbar, Nav, and Container from React Bootstrap
import { Link } from 'react-router-dom';
import { useAuth } from '../auth-context.js';

// This is the navigation bar to the Home Video Log App

export function AppNavbar() {
    const { authState } = useAuth();

    return (
        <Navbar bg="white" expand="lg" className="border-bottom box-shadow py-3 mb-3">
            <Container>
                <Navbar.Brand as={Link} to="/">Home Video Log</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/projects" className="text-dark">Projects</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/login" className="text-dark">Log In</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        {authState.token ? (
                            <Nav.Item className="text-dark">Logged In</Nav.Item>
                        ) : (
                            <Nav.Item className="text-dark">Logged Out</Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}