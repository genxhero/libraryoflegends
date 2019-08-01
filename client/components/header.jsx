

import React, { Component } from 'react';
import {Link} from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/current_user';

class Header extends Component {

  logout() {
    //The log out mutation goes here, brae
  }

  renderErrors() {
    if (this.props.data.error) {
      return <div className="error-popup">
         {this.props.data.error}
      </div>
    } else {
      return <div />
    }
  }

  render() {
    console.log("TheData:", this.props.data);
    return (
      <div className="header">
      {this.renderErrors()}
         <div className="header-left"> 
           <h1 className="header-title">Library of Legends</h1>
         </div>
         {this.props.data.currentUser ? 
          <div className="header-right">
            <h3>Welcome, {this.props.data.currentUser.username}</h3>
               <Link className="header-link" to="/">Logout</Link>
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

export default graphql(query)(Header);
