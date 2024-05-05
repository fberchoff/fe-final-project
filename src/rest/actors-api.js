class ActorsApi {
    get = async (authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}/actor`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchActors had an issue.', e);
        }
    }

    put = async(authState, project, actor) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}/actor/${actor.actorId}`, {
                method: 'PUT',
                headers: {                 
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like updating an actor had an issue.', e);    
        }
    }

    post = async(authState, project, actor) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}/actor`, {
                method: 'POST',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like adding an actor had an issue.', e);    
        }
    }

    delete = async(authState, actor) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/actor/${actor.actorId}`, {
                method: 'DELETE',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like deleting an actor had an issue.', e);    
        }
    }
}

export const actorsApi = new ActorsApi();