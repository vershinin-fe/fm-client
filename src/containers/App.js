import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ItemsListView from "../components/ItemsListView";
import {Route, Switch} from "react-router-dom";
import LoginForm from "../components/LoginForm";

const App = ({ store }) => (
    <Provider store={store}>
        <div className="ui container">
            <Switch>
                <Route exact path="/" component={ItemsListView} />
                <Route exact path="/login" component={LoginForm} />
                <Route render={({ location }) => (
                    <div className='ui inverted red segment'>
                        <h3>
                            Error! No matches for <code>{location.pathname}</code>
                        </h3>
                    </div>
                )}/>
            </Switch>
        </div>
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;