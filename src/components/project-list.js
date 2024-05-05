import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {projectsApi} from '../rest/projects-api.js';
import { useAuth } from '../auth-context.js';

// This displays the list of projects owned by the logged in user

export default function ProjectList(props) {
    const {authState} = useAuth();
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const projects = await projectsApi.get(authState);
        setProjects(projects);
    };
    
    // Fetch the list of projects. When the component mounts, there will be no projects
    useEffect(() => {fetchProjects();}, []);

    const deleteProject = async (project) => {
        await projectsApi.delete(authState, project);
        fetchProjects();
    }

    return (
        <>
            <h2 className="text-center mb-3">List of Projects</h2>
            <Button onClick={() => props.showForm({})} variant="primary" className="me-2 mb-4">Create</Button>
            <Button onClick={fetchProjects} variant="outline-primary" className="me-2 mb-4">Refresh</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.projectId}</td>
                            <td>{project.projectName}</td>
                            <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                                <Button
                                    onClick={() => props.showForm(project)}
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => props.showProjectMenu(project)}
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                >
                                    Manage
                                </Button>
                                <Button
                                    onClick={() => deleteProject(project)}
                                    variant="danger"
                                    size="sm"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}