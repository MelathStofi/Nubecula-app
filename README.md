This is the Nubecula application.
This is a React application.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Use:

1. "npm i" - to install the necessary packages.
2. create a .env file.
  current .env file:

    REACT_APP_DOMAIN_URI=http://localhost:8080

    REACT_APP_SIGN_UP_URL=${REACT_APP_DOMAIN_URI}/auth/sign-up
    REACT_APP_SIGN_IN_URL=${REACT_APP_DOMAIN_URI}/auth/sign-in
    REACT_APP_SIGN_OUT_URL=${REACT_APP_DOMAIN_URI}/auth/sign-out
    REACT_APP_VERIFY_USER_URL=${REACT_APP_DOMAIN_URI}/auth/verify

    REACT_APP_CURRENT_USER_URL=${REACT_APP_DOMAIN_URI}/users/current
    REACT_APP_CURRENT_USER_RENAME_URL=${REACT_APP_DOMAIN_URI}/users/rename
    REACT_APP_CURRENT_USER_DELETE_URL=${REACT_APP_DOMAIN_URI}/users/delete
    REACT_APP_USERS_URL=${REACT_APP_DOMAIN_URI}/users/

    REACT_APP_BASE_URL=${REACT_APP_DOMAIN_URI}
    REACT_APP_DIRECTORY_URL=${REACT_APP_DOMAIN_URI}/directories/directory
    REACT_APP_DIRECTORIES_URL=${REACT_APP_DOMAIN_URI}/directories
    REACT_APP_FILES_URL=${REACT_APP_DOMAIN_URI}/files

    REACT_APP_SHARE_URL=${REACT_APP_DOMAIN_URI}/toggle-share
    REACT_APP_REPLACE_URL=${REACT_APP_DOMAIN_URI}/replace
    REACT_APP_COPY_URL=${REACT_APP_DOMAIN_URI}/copy

    REACT_APP_PUBLIC_BASE_URL=${REACT_APP_DOMAIN_URI}/public

    REACT_APP_TRASH_BIN_URL=${REACT_APP_DOMAIN_URI}/trash-bin
    
3. "npm start" - to start the application.

The server needs to be running to use the application: https://github.com/MelathStofi/Nubecula-server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
