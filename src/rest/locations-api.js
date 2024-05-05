class LocationsApi {
    get = async (authState, project) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/user/${authState.userName}/project/${project.projectId}/location`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchLocations had an issue.', e);
        }
    }
}

export const locationsApi = new LocationsApi();