import React, { Component } from 'react'
import { graphql } from "react-apollo";
import query from "../queries/getuser";
import {hashHistory, Link} from 'react-router';
import { numberSuffix } from '../helpers';

class UserPage extends Component {
  constructor(props) {
      super(props);
      this.charlist = this.charlist.bind(this);
  }

 
  charlist() {
    const timestamp = Date.now();
    if (this.props.data.user.characters.length > 0) {
         return ( 
         <div className="user-characters"> 
            {this.props.data.user.characters.map(
                char => {
                return (
                    <div className="char-snippet"
                    key={`${char.firstName}${timestamp}${char.lastName}${char.id}`} 
                    value={`${char.id}`}
                    >
                    <div>{char.firstName} {char.lastName}</div>
                    <div>{char.level}{numberSuffix(char.level)} level {char.class}</div>
                
                    <img className="char-thumb" src="http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg" />
                    <Link to={`/characters/${char.id}`} className="link-button">VIEW PROFILE</Link>
                    </div>
                );
                })}
          </div>
        )
     } else {
         return (
          <div className="user-characters">
           <h3>No Characters Yet</h3>
         </div>
         );
     }
 }
  
  render() {
      console.log(this.props.data);
      if (!this.props.data.user || this.props.data.loading) {
          return <h1>Loading...</h1>
      }
      return (
          <div className="user-profile-page">
            <h1>{this.props.data.user.username}'s Profile Page</h1>
              {this.charlist()}     
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