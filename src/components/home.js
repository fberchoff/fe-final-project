import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h2 className="text-left mb-5">Home Video Log</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-left mb-3">What this is:</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-left mb-3">
                        <p>
                            The Home Video Log allows you to log your home videos in a database to allow for organizing and
                            searching. This app demonstrates a tiny portion of it's capababilities. With this app, you can:
                        </p>                     
                        <ul>
                            <li>Create new projects</li>
                            <li>Add, edit, and delete actors (subjects) of a project</li>
                            <li>Add, edit, and delete scenes of a project</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="text-left mt-4 mb-3">How to use this app:</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-left mb-3">
                        <p>
                            This app uses an API that you can run on your computer. The API includes an in-memory H2 database with
                            preloaded projects. To run the back-end API, simply do the following:
                        </p>                     
                        <ul>
                            <li>In a command terminal, set your directory to the root directory of this front-end project</li>
                            <li>Issue the command: java -jar home-video-log-0.0.1-SNAPSHOT.jar</li>
                            <li>Alternatively, you can run the back end API in an IDE by cloning the following Github repository:</li>
                        </ul>
                        <p className="ml-5">
                            <Link to="https://github.com/fberchoff/fe-final-project-back-end-api.git">
                                Home Video Log Back-End API
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-left mt-4 mb-3">
                        <h6>Log in as one of the following users to work with their projects:</h6>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>johnnyb</td>
                                <td>mypass</td>
                            </tr>
                            <tr>
                                <td>harold</td>
                                <td>password1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}