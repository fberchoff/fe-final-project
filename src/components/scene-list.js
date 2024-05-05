import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {scenesApi} from '../rest/scenes-api.js';
import { useAuth } from '../auth-context.js';

// This displays a list of scenes for a given project

export default function SceneList(props) {
    const {authState} = useAuth();
    const [scenes, setScenes] = useState([]);

    const fetchScenes = async () => {
        const scenes = await scenesApi.get(authState, props.project);
        setScenes(scenes);
    };
    
    // When the component mounts, we want the scenes to be empty.  However, to suppress the compiler warning message,
    // we include the below comment
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchScenes();}, []);

    const deleteScene = async (scene) => {
        await scenesApi.delete(authState, scene);
        fetchScenes();
    }

    return (
        <>
            <h2 className="text-center mb-3">List of Scenes</h2>
            <Button onClick={() => props.showSceneForm({}, props.project)} variant="primary" className="me-2 mb-4">Create</Button>
            <Button onClick={fetchScenes} variant="outline-primary" className="me-2 mb-4">Refresh</Button>
            <Button onClick={() => props.showProjectMenu(props.project)} variant="secondary" className="me-2 mb-4">Return</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>File ID</th>
                        <th>Location ID</th>
                        <th>Title</th>
                        <th>Summary</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Length (in seconds)</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {scenes.map((scene, index) => (
                        <tr key={index}>
                            <td>{scene.sceneId}</td>
                            <td>{scene.file.fileId}</td>
                            <td>{scene.location.locationId}</td>
                            <td>{scene.sceneTitle}</td>
                            <td>{scene.sceneSummary}</td>
                            <td>{scene.sceneStartTime}</td>
                            <td>{scene.sceneEndTime}</td>
                            <td>{scene.sceneLengthSec}</td>
                            <td>{scene.sceneRating}</td>
                            <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                                <Button
                                    onClick={() => props.showSceneForm(scene, props.project)}
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => deleteScene(scene, props.project)}
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