import './style/style.css';
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Login from './src/components/Login';
import App from './src/components/App';

const client = new ApolloClient();

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
