

import React, { Component } from 'react';
import {Link} from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/current_user';
import gql from 'graphql-tag';

class Header extends Component {

  constructor(props) {
    super(props);
    // This bit of state is for testing the error modal.
    // Feeling cute might delete later who knows
    this.state = {dummyError: false};
    this.logout = this.logout.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  logout() {
    this.props.mutate({
      refetchQueries: [ { query } ]
    })
  }

  renderErrors() {
    if (this.props.data.error || this.state.dummyError) {
      return <div className="error-popup">
         {this.props.data.error}
      </div>
    } else {
      return <div />
    }
  }

  render() {
    console.log(this.props.data);
    return (
      <div className="header">
      {this.renderErrors()}
         <div className="header-left"> 
           <h1 className="header-title">Library of Legends</h1>
         </div>
         {this.props.data.currentUser ? 
          <div className="header-right">
            <h3 className="custom-welcome">Welcome, {this.props.data.currentUser.username}</h3>
               <div className="header-link" onClick={this.logout}>Logout</div>
           </div>
         : 
           <div className="header-right">
             <Link className="header-link" to="/register">Register</Link>
             <Link className="header-link"to="/login">Login</Link>
           </div>
         }
          
      </div>
    )
  }
}

const mutation = gql`
mutation {
  logout {
    id
    username
  }
}`

export default graphql(mutation)(
  graphql(query)(Header));
