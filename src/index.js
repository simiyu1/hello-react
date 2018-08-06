import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './auth-pages';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Auth />, document.getElementById('root'));
registerServiceWorker();
