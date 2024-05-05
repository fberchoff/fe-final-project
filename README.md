# Getting Started with the Home Video Log App

Follow the regular procedure for using this web application (npm install and npm start). This web application uses a back-end API for which there is an included executable jar file in the root directory of this project. If you have Java 17 or higher installed, you can use the following command to start the back end API:

java -jar home-video-log-0.0.1-SNAPSHOT.jar

Alternatively, you can clone the API in your IDE and run from there: https://github.com/fberchoff/fe-final-project-back-end-api.git

The back end API uses an H2 in-memory database that is preloaded with data. Everything is self-contained. As an aid to using the front-end
web project, you will have access to various tools for monitoring or even manipulating the back end data:

- Use the H2 console. In a web browser, you can bring up the following URL to use the console:

http://localhost:8080/h2-console

- You can leave most of the settings to their default values. However, the JDBC URL should be set to: 

jdbc:h2:mem:home_video_log;MODE=MYSQL

- Once connected, you can query any table to view or even change the data.

- Use the Swagger UI interface for viewing or changing the data as well. Read the companion readme (Back-End API README.md) included in the root
directory of the project for detailed info on how to use it.

# Security

The back-end API requires a valid JWT token and user name. Therefore, when using the web application, you must login. There are two available
users:

- User "johnnyb" has a password of "mypass".  "johnnyb" is the owner of project #1.
- User "harold" has a password of "password1".  "harold" is the owner of project #2.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
