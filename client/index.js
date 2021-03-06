import './public/index.scss';
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory, IndexRoute } from "react-router";
import {IndexRoute} from "react-router-dom";
import App from './components/app';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import CharsIndex from './components/chars_index';
// import CharCreate from './components/char_create';
// import CharShow from './components/char_show';
// import Register from './components/register';
// import Login from './components/login';
// import UserPage from './components/user_page';


//Old
// const networkInterface = createNetworkInterface({
//   uri: "/graphql",
//   opts: {
//     credentials: 'same-origin'
//   }
// });

// const client = new ApolloClient({
//   networkInterface,
//   dataIdFromObject: o => o.id
// });

//New
const httpLink = createHttpLink({
  // uri: 'http://localhost:4000',
  uri: "/graphql"
  //   opts: {
//     credentials: 'same-origin'
//   }
})

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem(AUTH_TOKEN)
//   return {
//     headers: {
//       headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      // authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

//history={hashHistory} put this back into the router if need be 
// const Root = () => {
//   debugger;
//     return (
//     <ApolloProvider client={client}>
//         <Router >
//           <Route path="/" component={App}>
//             <Route path="/" component={CharsIndex} />
//             <Route path="/newchar" component={CharCreate} />
//             <Route path="/characters/:id" component={CharShow}/>
//             <Route path="/register" component={Register} />
//             <Route path="/login" component={Login} />
//             <Route path="/users/:username" component={UserPage} />
//           </Route> 
//         </Router>
//       </ApolloProvider>);
// };

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
  );
}

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
