import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/fetchchars';

class CharsIndex extends Component {

  constructor(props){
    super(props);
  }

  thStRd(num){
     switch (num){
        case 1:
        return "st";
        case 2: 
        return "nd";
        case 3: 
        return "rd";
        default: 
        return "th";
     }
  }

  componentDidMount() {
     this.setState({
       characters: this.props.data.characters
     })
  }

   charList(characters){
     const timestamp = Date.now();
     return characters.map(char => {
       return (
         <div className="char-snippet"
          key={`${char.firstName}${timestamp}${char.lastName}${char.id}`} 
          value={`${char.id}`}
          >
          <div>{char.firstName} {char.lastName}</div>
          <div>{char.level}{this.thStRd(char.level)} level {char.class}</div>
        
          <img className="char-thumb" src="http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg" />
          <Link to={`/characters/${char.id}`} className="link-button">VIEW PROFILE</Link>
         </div>
       );
     });
   }

  render() {
    if (this.props.data.loading || !this.props.data.characters){
      return (<div>
          <h1>LOADING.......</h1>
      </div>);
    }
  
    const characters = this.props.data.characters;
    return (    
      <div className="index-page"> 
       <div className="intro-content">
          <h1 id="index-title">Names of Legend</h1>
          <p>Welcome to the Library of Legends, where tales of great heroes lie.</p>
          </div>   
        <div className="chars-spread">
            {this.charList(characters)}
          </div>
          <div className="link-container"> 
            <Link to="/newchar" className="link-button">Create New Character</Link>
          </div>
      </div>
       );
   }
}



export default graphql(query)(CharsIndex);