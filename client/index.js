import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
      <ApolloProvider client={client}>
          <Router history={hashHistory}>
              <Route path="/" component={App}>
                  <IndexRoute component={Pages.Home} />
                  <Route path="/login" component={Pages.Login} />
                  <Route path="/signup" component={Pages.Signup} />
              </Route>
          </Router>
      </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
