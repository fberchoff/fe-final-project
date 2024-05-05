class ScenesApi {
    get = async (authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}/scene`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchScenes had an issue.', e);
        }
    }

    put = async(authState, project, scene) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/file/${scene.fileId}/scene/${scene.sceneId}`, {
                method: 'PUT',
                headers: {                 
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scene)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like updating a scene had an issue.', e);    
        }
    }

    post = async(authState, project, scene) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/file/${scene.fileId}/scene`, {
                method: 'POST',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scene)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like adding a scene had an issue.', e);    
        }
    }

    delete = async(authState, scene) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/scene/${scene.sceneId}`, {
                method: 'DELETE',
                headers: {                    
                    'Authorization': `Bearer ${authState.token}`,
                    'Content-Type': 'application/json'
                },
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like deleting a scene had an issue.', e);    
        }
    }
}

export const scenesApi = new ScenesApi();