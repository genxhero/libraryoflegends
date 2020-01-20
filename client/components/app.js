import React from 'react';
import Header from './header';
import { graphql } from 'react-apollo';
import currentUser from '../queries/current_user';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharsIndex from './chars_index';
import CharCreate from './char_create';
import CharShow from './char_show';
import Register from './register';
import Login from './login';
import UserPage from './user_page';

const App = ( props ) => {
    return <div className="container">
      <Router>
            <Header />
         <div className="content"> 
         <Switch>
             <Route exact path="/" component={CharsIndex} />
             <Route exact path="/newchar" component={CharCreate} />
             <Route exact path="/characters/:id" component={CharShow}/>
             <Route exact path="/register" component={Register} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/users/:username" component={UserPage} />
         </Switch>
         </div>
      </Router>
    </div>;
}

export default graphql(currentUser)(App);