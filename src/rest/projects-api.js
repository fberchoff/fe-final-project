class ProjectsApi {
    get = async (authState) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchProjects had an issue.', e);
        }
    }

    put = async(authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}`, {
                method: 'PUT',
                headers: {                 
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like updating a project had an issue.', e);    
        }
    }

    post = async(authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project`, {
                method: 'POST',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like adding a project had an issue.', e);    
        }
    }

    delete = async(authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}`, {
                method: 'DELETE',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like deleting a project had an issue.', e);    
        }
    }
}

export const projectsApi = new ProjectsApi();