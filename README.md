# Final Project Gigih

[![](https://img.shields.io/badge/TYPESCRIPT%20-%233178C6.svg?&style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org) [![](https://img.shields.io/badge/REACT%20-%2356BDDA.svg?&style=flat&logo=react&logoColor=white)](https://reactjs.org) [![](https://img.shields.io/badge/TAILWIND%20-%2338B2AC.svg?&style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

this is final project for [Program Gigih](https://www.anakbangsabisa.org/generasi-gigih/) using [react](https://reactjs.org)

## Installation

Use the package manager [npm](https://www.npmjs.com) to install this.

```base
npm install
```

dont forget to update `.env`

```sh
REACT_APP_REDIRECT_URL = ''
REACT_APP_CLIENT_ID = ''
```

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

## Features

- Auth (of course if you reload the page it doesn't logput)
  - Login with spotify
  - Signout
  - Use auth data (user pictures, email)
- Track
  - Search
  - Show recent song in dashboard
  - Select and deselect
  - Create playlist
    - Validation for title
  - Update Playlist detail & item
  - Unfollow playlist
  - Play preview

## Upcoming Features

- Play song
- Add track to already exist playlist
- Custom playlist cover

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
