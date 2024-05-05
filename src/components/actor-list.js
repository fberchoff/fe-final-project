import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {actorsApi} from '../rest/actors-api.js';
import { useAuth } from '../auth-context.js';

// This displays a list of actors for a given project

export default function ActorList(props) {
    const {authState} = useAuth();
    const [actors, setActors] = useState([]);

    const fetchActors = async () => {
        const actors = await actorsApi.get(authState, props.project);
        setActors(actors);
    };
    
    // When the component mounts, we want the list of actors to be empty.  However, it causes a compiler warning.
    // We include the below comment to supress the compiler warning

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchActors();}, []);

    const deleteActor = async (actor) => {
        await actorsApi.delete(authState, actor);
        fetchActors();
    }

    return (
        <>
            <h2 className="text-center mb-3">List of Actors</h2>
            <Button onClick={() => props.showActorForm({}, props.project)} variant="primary" className="me-2 mb-4">Create</Button>
            <Button onClick={fetchActors} variant="outline-primary" className="me-2 mb-4">Refresh</Button>
            <Button onClick={() => props.showProjectMenu(props.project)} variant="secondary" className="me-2 mb-4">Return</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor, index) => (
                        <tr key={index}>
                            <td>{actor.actorId}</td>
                            <td>{actor.actorFirstName}</td>
                            <td>{actor.actorLastName}</td>
                            {/* The birth date is stored as yyyy-mm-dd.  We want to display it as mm/dd/yyyy */}
                            <td>{new Date(actor.actorBirthDate + 'T00:00:00').toLocaleDateString()}</td>
                            <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                                <Button
                                    onClick={() => props.showActorForm(actor, props.project)}
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => deleteActor(actor, props.project)}
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