import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { loginApi } from '../rest/login-api.js';
import { useAuth } from '../auth-context.js';
import { useNavigate } from 'react-router-dom';

// This is the form used for logging in the user. The user must log in to access their projects

// We are leveraging the authorization context (created in auth-context.js) for managing authorization

export default function LoginForm(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleLogin = async (credentials) => {
        try {
            const response = await loginApi.post(credentials);
            const accessToken = response.accessToken;
            const userName = credentials.userName;
            // Invoke the login function to set the token and user name in the authorization context
            login(accessToken, userName);
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Login succesful.
                </div>
            )
            return;    
        } catch (error) {
            console.log("Login failed: error");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Login failed. Please try again.
                </div>
            )
            return;    
            }
    }


    function handleSubmit(event) {
        event.preventDefault();

        // Read form data
        const formData = new FormData(event.target);

        // Convert formData to object
        const credentials = Object.fromEntries(formData.entries());

        // Form validation
        if (!credentials.userName || !credentials.password) {
            console.log("Please provide user name and password!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide user name and password!
                </div>
            )
            return;
        }

        // login
        handleLogin(credentials);

    }

    // If the user cancels out of the login, we use the useNavigate() hook to route back to the home page.
    function handleCancel() {
        navigate('/');
    }

    return (
        <>
            <h3 className="text-center mb-3">{"Log In"}</h3>

            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    {errorMessage}
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="userName"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                size="sm"
                                type="password"
                                name="password"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 d-md-flex justify-content-center">
                            <Button type="submit" variant="primary" size="sm" className="me-3">
                                Submit
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}