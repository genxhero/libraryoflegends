import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/current_user';
import gql from 'graphql-tag';

class Header extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
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
    let cool = "";
    if (this.props.data.currentUser) {
      cool = this.props.data.currentUser.cool === true ? "cool" : "";
    }
    return (
      <div className={`header ${cool}`}>
        <div className={`header-content ${cool}`}>
          <div className="header-buffer" />
          <div className="header-left">
            <Link className="home-link" to="/">
              <h1 className={`header-title ${cool}`}>
                <span className={`stud-top-left ${cool}`} />
                <span className={`stud-top-right ${cool}`} />
                <span className={`stud-bottom-left ${cool}`} />
                <span className={`stud-bottom-right ${cool}`} />
                Library of Legends
              </h1>
            </Link>
          </div>
          {this.props.data.currentUser ? (
            <div className="header-right" id="header-right">
              <h3 className="custom-welcome">
                Welcome,{" "}
                <Link
                  className="custom-welcome-link"
                  to={`/users/${this.props.data.currentUser.username}`}
                >
                  {this.props.data.currentUser.username}
                </Link>
              </h3>
              <div className={`header-link ${cool}`} onClick={this.logout}>
                Logout
              </div>
            </div>
          ) : (
            <div className="header-right" id="header-right">
              <Link className={`header-link ${cool}`} to="/register">
                Register
              </Link>
              <Link className={`header-link ${cool}`} to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    );
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
