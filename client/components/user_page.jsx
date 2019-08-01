import React, { Component } from 'react'
import { graphql } from "react-apollo";
import query from "../queries/getuser";
import {hashHistory} from 'react-router';

class UserPage extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      console.log(this.props.data);
      return (
          <div className="user-profile-page">
            <h1>This is a placeholder</h1>
      </div>
      );
      
  }
}

export default graphql(query, {
    options: props => {
        return {
        variables: {
            username: props.params.username
        }
        };
    }
    })(UserPage);