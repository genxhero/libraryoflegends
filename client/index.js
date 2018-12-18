import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import CharsIndex from './components/chars_index';


const client = new ApolloClient({});
//COnfiguration objects

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <CharsIndex />
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);