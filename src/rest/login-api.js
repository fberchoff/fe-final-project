class LoginApi {

    post = async(credentials) => {
        try {
            const resp = await fetch(`http://localhost:8080/home_video_log/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like logging in had an issue.', e);    
        }
    }

}

export const loginApi = new LoginApi();