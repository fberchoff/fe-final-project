import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectList from './project-list';
import ProjectForm from './project-form';
import ProjectMenu from './project-menu';
import ActorList from './actor-list';
import ActorForm from './actor-form';
import SceneList from './scene-list';
import SceneForm from './scene-form';
import { useAuth } from '../auth-context.js';
import { useNavigate } from 'react-router-dom';

export function Projects() {
    const [content, setContent] = useState(<ProjectList showProjectMenu={showProjectMenu} showForm={showForm} />);
    const {authState} = useAuth();
    const navigate = useNavigate();

    // Show list of projects owned by the logged in user
    function showList() {
        setContent(<ProjectList showProjectMenu={showProjectMenu} showForm={showForm} />);
    }

    // Show the form used to add or update a project
    function showForm(project) {
        setContent(<ProjectForm project={project} showList={showList} />);
    }

    // Show the form used to add or update an actor.  Pass the function to list the actors in a project when needed
    function showActorForm(actor, project) {
        setContent(<ActorForm actor={actor} project={project} showActors={showActors} />);
    }

    // Show the form used to add or update a scene.  Pass the function to list the scenes in a project when needed
    function showSceneForm(scene, project) {
        setContent(<SceneForm scene={scene} project={project} showScenes={showScenes} />);
    }
    
    // This shows the menu of actions available for a given project. Pass the functions that show the list of actors and scenes for the 
    // project. Also pass the function that lists all the projects for the logged in user
    function showProjectMenu(project) {
        setContent(<ProjectMenu project={project} showActors={showActors} showScenes={showScenes} showList={showList}/>);
    }

    // Function to show the list of actors for a given project.  Pass the function used to display the form to add or edit an actor
    function showActors(project) {
        setContent(<ActorList project={project} showProjectMenu={showProjectMenu} showActorForm={showActorForm} />);
    }

    // Function to show the list of scenes for a given project. Pass the function used to display the form to add or edit a scene
    function showScenes(project) {
        setContent(<SceneList project={project} showProjectMenu={showProjectMenu} showSceneForm={showSceneForm} />);
    }

    // Check for JWT token and redirect if needed
    useEffect(() => {
        // If token doesn't exist, redirect to the login page via the useNavigate hook
        if (!authState.token || authState.token.length === 0) {
            navigate('/login');
        }
    }, [authState.token, navigate]);

    return (
        <Container className="my-5"> {/* Use Container component */}
            {content}
        </Container>
    );
}