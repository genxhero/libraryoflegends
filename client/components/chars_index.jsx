import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CharsIndex extends Component {

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

   charList(characters){
     const timestamp = Date.now();
     return characters.map(char => {
       return (
         <div className="char-snippet" key={`${char.firstName}${timestamp}${char.lastName}${char.id}`}>
          <div>{char.firstName} {char.lastName}</div>
          <div>{char.level}{this.thStRd(char.level)} level {char.class}</div>
         </div>
       );
     });
   }

  render() {
    // debugger;
    if (this.props.data.loading){
      return (<div>
          <h1>LOADING.......</h1>
      </div>);
    }
    const characters = this.props.data.characters;
    return (    
        <div className="chars-spread">
          {this.charList(characters)}
        </div>);
   }
}

const query = gql`
  {
    characters {
      id
      firstName
      lastName
      class
      level
    }
  }
`;


export default graphql(query)(CharsIndex);