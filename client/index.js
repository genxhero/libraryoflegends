import './public/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import CharsIndex from './components/chars_index';
import CharCreate from './components/char_create';
import CharShow from './components/char_show';
import App from './components/app';
import Register from './components/register';


const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
//COnfiguration objects

const Root = () => {
    return (
    <ApolloProvider client={client}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={CharsIndex} />
          </Route>
          <Route path="/newchar" component={CharCreate} />
          <Route path="/characters/:id" component={CharShow}/>
          <Route path="/register" component={Register} />
        </Router>
      </ApolloProvider>);
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);