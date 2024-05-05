import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { scenesApi } from '../rest/scenes-api.js';
import { useAuth } from '../auth-context.js';
import { filesApi } from '../rest/files-api.js';
import { locationsApi } from '../rest/locations-api.js';

// This displays the form used to add or edit a scene

export default function SceneForm(props) {
    const { authState } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [files, setFiles] = useState([]); // State to hold files
    const [locations, setLocations] = useState([]); // State to hold files

    // Fetch a list of all the project's files when the component mounts. We will use this list
    // for the user to choose a file to associate with a given scene.
    useEffect(() => {
        async function fetchFiles() {
            try {
                const data = await filesApi.get(authState, props.project);
                setFiles(data);
            } catch (error) {
                console.log('Error fetching files:', error);
            }
        }

        fetchFiles();
    }, [authState, props.project]);


    // Fetch a list of all the project's locations when the component mounts. We will use this list
    // for the user to choose a location to associate with a given scene.
    useEffect(() => {
        async function fetchLocations() {
            try {
                const data = await locationsApi.get(authState, props.project);
                setLocations(data);
            } catch (error) {
                console.log('Error fetching locations:', error);
            }
        }

        fetchLocations();
    }, [authState, props.project]);


    const updateScene = async (scene) => {
        await scenesApi.put(authState, props.project, scene);
        props.showScenes(props.project);
    }

    const addScene = async (scene) => {
        await scenesApi.post(authState, props.project, scene);
        props.showScenes(props.project);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Read form data
        const formData = new FormData(event.target);

        // Convert formData to object
        const scene = Object.fromEntries(formData.entries());

        // Here we are creating a file object. The back end API accepts the file to associate with a scene as an object (file ID and file name)
        // We will use this object to stay compatible with the back end requirements
        const file = {
            fileId: scene.fileId
        };

        // Here we are creating a location object. The back end API accepts the location to associate with a scene as an object (location ID and location name)
        // We will use this object to stay compatible with the back end requirements
        const location = {
            locationId: scene.locationId
        };

        // We will use the start and end times to derive the scene length (measured in seconds). To prepare for that calculation,
        // we will first convert the start and end times to Date objects
        const startTime = new Date(`1970-01-01T${scene.sceneStartTime}`);
        let endTime = new Date(`1970-01-01T${scene.sceneEndTime}`);

        // If start time is greater than end time, we assume that the start time began the day before
        if (startTime > endTime) {
            endTime.setDate(endTime.getDate() + 1); // Add a day to end time
        }

        // Calculate scene length.  We divide by 1000 to convert milliseconds to seconds
        const sceneLengthSec = (endTime.getTime() - startTime.getTime()) / 1000;
        scene.sceneLengthSec = sceneLengthSec;

        // Form validation
        if (!scene.sceneTitle || !scene.sceneSummary || !scene.sceneStartTime || !scene.sceneEndTime
            || !scene.sceneLengthSec || !scene.sceneRating) {
            console.log("Please provide all scene details!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please provide all scene details!
                </div>
            )
            return;
        }

        if (props.scene.sceneId) {
            scene.sceneId = props.scene.sceneId;
            scene.file = file;
            scene.location = location;
            updateScene(scene);
        } else {
            // Create a new scene
            scene.file = file;
            scene.location = location;
            addScene(scene);
        }
    }

    return (
        <>
            <h3 className="text-center mb-3">{props.scene.sceneId ? "Edit Scene" : "Create New Scene"}</h3>

            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    {errorMessage}
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group className="mb-3" controlId="fileId">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                size="sm"
                                as="select"
                                name="fileId"
                                defaultValue={props.scene.sceneId ? props.scene.file.fileId : ""}
                            >
                                {files.map(file => (
                                    <option key={file.fileId} value={file.fileId}>{`${file.fileId} - ${file.fileName}`}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="locationId">
                            <Form.Label>Location ID</Form.Label>
                            <Form.Control
                                size="sm"
                                as="select"
                                name="locationId"
                                defaultValue={props.scene.sceneId ? props.scene.location.locationId : ""}
                                >
                                    {locations.map(location => (
                                        <option key={location.locationId} value={location.locationId}>
                                            {`${location.locationId} - ${location.locationName}`}
                                        </option>
                                    ))}
                                </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="sceneTitle"
                                defaultValue={props.scene.sceneTitle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneSummary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="sceneSummary"
                                defaultValue={props.scene.sceneSummary}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                size="sm"
                                type="time"
                                step="1"
                                name="sceneStartTime"
                                defaultValue={props.scene.sceneStartTime}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneEndTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                size="sm"
                                type="time"
                                step="1"
                                name="sceneEndTime"
                                defaultValue={props.scene.sceneEndTime}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneLengthSec">
                            <Form.Label>Length (in seconds)</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                readOnly
                                disabled
                                name="sceneLengthSec"
                                defaultValue={props.scene.sceneLengthSec}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sceneRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="sceneRating"
                                defaultValue={props.scene.sceneRating}
                            />
                        </Form.Group>
                        {props.scene.sceneId && (
                            <Form.Group className="mb-3" controlId="sceneId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="sceneId"
                                    readOnly
                                    disabled
                                    defaultValue={props.scene.sceneId}
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
                                onClick={() => props.showScenes(props.project)}
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