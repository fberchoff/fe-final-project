import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { projectsApi } from '../rest/projects-api.js';
import { useAuth } from '../auth-context.js';

// This displays the form to add or edit a project

export default function ProjectForm(props) {
    const {authState} = useAuth();
    const [errorMessage, setErrorMessage] = useState("");

    const updateProject = async (project) => {
        await projectsApi.put(authState, project);
        props.showList();
    }

    const addProject = async (project) => {
        await projectsApi.post(authState, project);
        props.showList();
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Read form data
        const formData = new FormData(event.target);

        // Convert formData to object
        const project = Object.fromEntries(formData.entries());

        // Form validation
        if (!project.projectName) {
            console.log("Please provide a project name!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide a project name!
                </div>
            )
            return;
        }

        // If a project Id already exists, it means we want to update an existing project.  Otherwise,
        // we want to create a new one.
        if (props.project.projectId) {
            project.projectId = props.project.projectId;
            updateProject(project);
        } else {
            // Create a new project
            addProject(project);
        }
    }

    return (
        <>
            <h3 className="text-center mb-3">{props.project.projectId ? "Edit Project" : "Create New Project"}</h3>

            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    {errorMessage}
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="projectName"
                                defaultValue={props.project.projectName}
                            />
                        </Form.Group>
                        {props.project.projectId && (
                            <Form.Group className="mb-3" controlId="projectId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="projectId"
                                    readOnly
                                    disabled
                                    defaultValue={props.project.projectId}
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
                                onClick={() => props.showList()}
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