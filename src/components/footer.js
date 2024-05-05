import React from 'react';
import { Container } from 'react-bootstrap';

// This is the page footer

export function Footer() {
    return (
        <footer>
            <Container className="p-3 mt-5 border-top">
                <small className="d-block text-muted text-center">© 2024 - Home Video Log</small>
            </Container>
        </footer>
    );
}
