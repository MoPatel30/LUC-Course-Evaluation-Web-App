import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App/App';

import {Test} from './review/review'

import {PopUp} from './Popup/Popup'

import * as serviceWorker from './serviceWorker';




ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Tester />, document.getElementById('tester'));

ReactDOM.render(<Test /> , document.getElementById('test'));

//ReactDOM.render(<Search /> , document.getElementById('search'));

ReactDOM.render(<PopUp /> , document.getElementById('pop-up'));


//ReactDOM.render(<DbTester /> , document.getElementById('db-tester'));

//ReactDOM.render(<ShowsReviews /> , document.getElementById('shows-reviews'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
