import React, { Component } from 'react';
import gql from 'graphql-tag';
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



  componentWillUpdate(nextProps, nextStat){
  
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



export default graphql(query)(CharsIndex);