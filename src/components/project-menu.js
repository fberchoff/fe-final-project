import { Table, Button } from 'react-bootstrap';

// This displays the menu of actions you can take for a given project

export default function ProjectMenu(props) {

    return (
        <>
            <h2 className="text-center mb-3">{ props.project.projectName }</h2>
            <Button onClick={() => props.showList()} variant="secondary" className="me-2 mb-4">Return</Button>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>Manage Actors</td>
                        <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                            <Button
                                onClick={() => props.showActors(props.project)}
                                variant="primary"
                                size="sm"
                                className="me-2"
                            >
                                Manage
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Manage Scenes</td>
                        <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                            <Button
                                onClick={() => props.showScenes(props.project)}
                                variant="primary"
                                size="sm"
                                className="me-2"
                            >
                                Manage
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}