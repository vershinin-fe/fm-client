import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import configureStore from "./store/configureStore";
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
    <Router>
        <App store={store} />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();