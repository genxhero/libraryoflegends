import React, { Component } from 'react'
import { graphql } from "react-apollo";
import query from "../queries/getuser";
// import {hashHistory } from 'react-router';
import {Link} from 'react-router-dom';
import { numberSuffix } from '../helpers';
import currentUser from "../queries/current_user";
import CoolToggle from './cool_toggle';

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
                <h1 className="user-profile-header">Characters</h1>
                
                  <div className="chars-spread"> 
                            {this.props.data.user.characters.map(
                                char => {
                                return (
                                    <div className="char-snippet"
                                        key={`${char.firstName}${timestamp}${char.lastName}${char.id}`} 
                                        value={`${char.id}`}
                                        >
                                        <div className="char-snippet-name">{char.firstName} {char.lastName}</div>
                                        <div className="char-snippet-class">{char.level}{numberSuffix(char.level)} level <span className="be-capitalized"> {char.class}</span></div>
                                        
                                        <div className="char-thumb-container">
                                            <img className="char-thumb" src={char.image ? `${char.image}` : "http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg"} />
                                        </div>
                                        <Link to={`/characters/${char.id}`} className="link-button">VIEW PROFILE</Link>
                                        </div>
                                );
                                })}
                    </div>
             </div>
   
        )
     } else {
         return (
          <div className="chars-spread">
           <h3 className="user-profile-header">No Characters Yet</h3>
         </div>
         );
     }
 }
  
  render() {
    if (this.props.data.error) {
        return <div>GraphQL Error</div>
    }
      if (!this.props.data.user || this.props.data.loading) {
          return <h1>Loading user home page...</h1>
      }
      const user = this.props.data.user

      return (
          <div className="user-profile-page">
            <div className="user-page-top">
                <div className="user-thumb-container"> 
                    <img src={user.avatar ? `${user.avatar}` : "http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg"} />
                </div>
                <h1 className="user-profile-title">{user.username}'s Profile Page</h1>
            </div>

          <div className="user-page-middle">
            <div className="user-about">
                <h1 className="user-profile-header">About Me</h1>
                <div style={{"display":"flex"}}>
                        <div className="user-fieldnames"> 
                            <span className="user-vital-fieldname">First Name:</span>
                            <span className="user-vital-fieldname">Last Name:</span> 
                        </div>
                        <div  className="user-data"> 
                            <span className="user-vital"> <span className="be-capitalized">Placeholder</span></span>
                            <span className="user-vital"> <span className="be-capitalized">von Workinprogress III</span></span>
                        </div>
                    </div>
                     <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>   
                
            </div>
           
                
            <div className="user-options"> 
                    <h1 className="user-profile-header">Options</h1>
                        <CoolToggle cool={user.cool} id={user.id} />
                </div>
                
            </div>
    
              {this.charlist()}     
          </div>
      );
      
  }
}

export default graphql(query, {
    options: props => {
        return {
        variables: {
            username: props.match.params.username
        }
        };
    }
    })(UserPage);