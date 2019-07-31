

import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
         <div className="header-left"> 
           <h1 className="header-title">Library of Legends</h1>
         </div>
            <div className="header-right">
                <Link className="header-link" to="/register">Register</Link>
               <Link className="header-link"to="/">Login</Link>
            </div>
      </div>
    )
  }
}
