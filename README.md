# Eyad Abu-Zaid Scandiweb React Developer Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This is my implementation of the test store app 

## Tools Used

Javascript, React (Class Components), Vanilla CSS for styling 

## Packages

- tilework/opus
- html-react-parser
- react-router-dom

I refrained from using state management libraries like Redux, even though it makes the code more redundant,
because  I wanted to keep 3rd party tools to an absolute minimum,
using only what's absolutely necessary. And passed the state manually to the components that require them.

## Development

Also, some nested JavaScript nested loops are implemented. However, these are limited to the cases when looping over
currencies or product attributes, where array items shouldn't normally exceed 5 items, so the code is basically executed
in linear time (O(n)) rather than square time (O(n)^2)

## File and Folder Structure

Inside the source folder, there are 4 main directories:

- api: it contains the queries that fetch data from the graphql API
- assets: containing the SVGs for all the icons used throughout the project
- pages: containing the code and styles of the 3 main views: Categories Page (PLP), Product Page (PDP) and Cart Page
- components: containing the smaller components that build the main pages; like Navbar, Product Card etc..
- all the general utility functions are defined inside App.js and passed throughout components as props


## Naming Convention

- Class Names: hyphen-separated names are used throughout the project
- variables and Functions: camelCase convention is used throughout the project


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
