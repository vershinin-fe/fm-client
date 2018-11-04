import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ItemsListView from "../components/ItemsListView";

const App = ({ store }) => (
    <Provider store={store}>
        <ItemsListView />
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;