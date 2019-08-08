import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import query from "../queries/fetchchar";
import index from "../queries/fetchchars";
import {hashHistory} from 'react-router';

class CharShow extends Component {

    constructor(props){
        super(props);
        this.sakujo = this.sakujo.bind(this);
    }

    /**
     * Sakujo is Japanese for delete. It's a Death Note reference. Deal with it.
     * @param {*} event 
     */
    sakujo(event){
        event.preventDefault();
        const id = event.target.value;
        this.props.mutate({ 
            variables: { id: id },
            refetchQueries: [ { query: index } ]
        })
        .then(hashHistory.push('/'));
    }


render() {
   
    const char = this.props.data.character;

    if (!char){
        return <div>Loading...</div>
    }

    return <div className="char-show">
        <div className="char-show-top">
          <div className="char-pic">
            <img className="char-image" src={char.image ? char.image : "https://i.imgur.com/JuPz9g3.gif"} />
          </div>
          <div className="char-vitals">
            <h2>Personal Information</h2>
            <h4 className="char-vital">
            <div>Name:</div> <div className="be-capitalized">{char.firstName}</div> <div className="be-capitalized">{char.lastName} </div>
            </h4>
           
            <div className="char-vital"><span>Player:</span>{char.user.username}</div>
            <div className="char-vital"><span>Race: </span><span className="be-capitalized">{char.ancestry}</span></div>
            <div className="char-vital"><span>Age:</span> {char.age}</div>
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
          <div className="char-cp"> 
             <button onClick={this.sakujo} value={char.id}>Delete Character</button>
          </div>

        </div>
        <h3>Biography</h3>
        <p className="char-bio">{char.bio}</p>
      </div>;
  }
}

const mutation = gql`
mutation DeleteChar($id: String!){
    deleteCharacter(id: $id){
        id
    }
}
`;

export default graphql(mutation)(
    graphql(query, {
    options: props => {
        return {
        variables: {
            id: props.params.id
        }
        };
    }
    })(CharShow)
);