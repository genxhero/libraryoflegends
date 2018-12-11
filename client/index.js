import React from 'react';
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({})
//COnfiguration objects

const Root = () => {
    return (
<ApolloProvider client={client}>
    <div>Butt</div>
</ApolloProvider>
    );
}

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);