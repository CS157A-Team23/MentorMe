import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Banner from './Banner';
import NavBar from './NavBar';
import Profile from './Profile';
import Connects from './Connects';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<Banner />, document.getElementById('banner'));
ReactDOM.render(<Profile />, document.getElementById('root'));
ReactDOM.render(<Connects />, document.getElementById('connects'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();