import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { actorsApi } from '../rest/actors-api.js';
import { useAuth } from '../auth-context.js';

// This displays the form for editing or adding an actor

export default function ActorForm(props) {
    const {authState} = useAuth();
    const [errorMessage, setErrorMessage] = useState("");

    const updateActor = async (actor) => {
        await actorsApi.put(authState, props.project, actor);
        props.showActors(props.project);
    }

    const addActor = async (actor) => {
        await actorsApi.post(authState, props.project, actor);
        props.showActors(props.project);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Read form data
        const formData = new FormData(event.target);

        // Convert formData to object
        const actor = Object.fromEntries(formData.entries());

        // Form validation
        if (!actor.actorFirstName || !actor.actorLastName || !actor.actorBirthDate) {
            console.log("Please provide all actor details!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide a all actor details!
                </div>
            )
            return;
        }

        // If an actor ID already exists, we know we want to edit an existing actor.  Otherwise, we want to add a new one
        if (props.actor.actorId) {
            actor.actorId = props.actor.actorId;
            updateActor(actor);
        } else {
            // Create a new actor
            addActor(actor);
        }
    }

    return (
        <>
            <h3 className="text-center mb-3">{props.actor.actorId ? "Edit Actor" : "Create New Actor"}</h3>

            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    {errorMessage}
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group className="mb-3" controlId="actorFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="actorFirstName"
                                defaultValue={props.actor.actorFirstName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="actorLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="actorLastName"
                                defaultValue={props.actor.actorLastName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="actorBirthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                size="sm"
                                type="date"
                                name="actorBirthDate"
                                defaultValue={props.actor.actorBirthDate}
                            />
                        </Form.Group>
                        {props.actor.actorId && (
                            <Form.Group className="mb-3" controlId="actorId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="actorId"
                                    readOnly
                                    disabled
                                    defaultValue={props.actor.actorId}
                                />
                            </Form.Group>
                        )}
                        <div className="d-grid gap-2 d-md-flex justify-content-center">
                            <Button type="submit" variant="primary" size="sm" className="me-3">
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => props.showActors(props.project)}
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