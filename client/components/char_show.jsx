import React, { Component } from 'react'
import { graphql } from "react-apollo";
import query from "../queries/fetchchar";

class CharShow extends Component {

    constructor(props){
        super(props);
    }


render() {
   
    const char = this.props.data.character;
    if (!char){
        return <div>Loading...</div>
    }

    return <div className="char-show">
        <div className="char-show-top">
          <div className="char-pic">
            <img className="char-image" src="https://i.imgur.com/JuPz9g3.gif" />
          </div>
          <div className="char-vitals">
            <h2>Personal Information</h2>
            <h4 className="char-vital">
            <div>Name:</div> <div className="be-capitalized">{char.firstName}</div> <div className="be-capitalized">{char.lastName} </div>
            </h4>
           
            <div className="char-vital"><span>Player:</span>{char.user.username}</div>
            <div className="char-vital"><span>Race: </span><span className="be-capitalized">{char.ancestry}</span></div>
            <div className="char-vital"><span>Class: </span><span className="be-capitalized"></span><span className="be-capitalized">{char.class}</span></div>
            <div className="char-vital"><span>Level:</span> {char.level}</div>
          </div>

          <div className="char-statline">
            <h2>Ability Scores</h2>
            <h4>Strength: {char.statline.strength}</h4>
            <h4>Dexterity: {char.statline.dexterity}</h4>
            <h4>Constitution: {char.statline.constitution}</h4> 
            <h4>Intelligence: {char.statline.intelligence}</h4>
            <h4>Wisdom: {char.statline.wisdom}</h4>
            <h4>Charisma: {char.statline.charisma}</h4>
          </div>

        </div>
        <p>{char.bio}</p>
      </div>;
  }
}



export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.params.id
      }
    };
  }
})(CharShow);