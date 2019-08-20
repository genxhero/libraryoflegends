import React, { Component } from 'react'
import { graphql, compose} from "react-apollo";
import gql from 'graphql-tag';
import query from "../queries/fetchchar";
import index from "../queries/fetchchars";
import currentUser from "../queries/current_user";
import {hashHistory} from 'react-router';
import $ from 'jquery';
import EditBio from './edit_bio';
import EditPersonal from './edit_personal';

class CharShow extends Component {

    constructor(props){
        super(props);
        // Bio state is required for in-line editing.
        this.state = {
            showModal: false, 
            editingBio: false,
            editingPersonal: false,
            bio: ""
        }
        this.sakujo = this.sakujo.bind(this);
        this.editCharacter = this.editCharacter.bind(this);
        this.openConfirmationModal = this.openConfirmationModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState(() => { return { bio: newProps.data.character.bio}})
    }
    /**
     * Sakujo is Japanese for delete. It's a Death Note reference. Deal with it.
     * @param {*} event 
     */
    sakujo(event) {
        event.preventDefault();
        $('body').css('overflow', 'auto');
        const id = event.target.value;
        this.props.mutate({
            variables: { id: id },
            refetchQueries: [{ query: index }]
        })
        .then(hashHistory.push('/'));
    }
    
    openConfirmationModal() {
        event.preventDefault();
        $('body').css('overflow', 'hidden');
        this.setState( () => {return {showModal: true}})
    }
    
    closeConfirmationModal() {
        event.preventDefault();
        $('body').css('overflow', 'auto');
        this.setState(() => { return { showModal: false } })
    }

    /**
     * Opens editing.
     */
    editCharacter(event){
        this.setState(   { [`editing${event.target.name}`]: true} );
    }

    cancelEdit(event){
         this.setState( { [`editing${event.target.name}`]: false } )
    }

    finishEdit(field) {
        this.setState({ [`editing${field}`]: false })
    }


render() {
    const char = this.props.data.character;
    const currentUser = this.props.data.currentUser || {id: "nobody is logged in"};

    if (!char){
        return <div>Loading...</div>
    }

    const creatorMatch = char.user.id === currentUser.id;

    return <div className="char-show">
        <div className="char-show-top">
          <div className="char-vitals">
            <img className="char-image" src={char.image ? char.image : "https://i.imgur.com/JuPz9g3.gif"} />
          </div>
          <div className="char-vitals">
                <h2>Personal Information</h2>
                {this.state.editingPersonal ? 
                  <EditPersonal 
                  id={char.id}
                  first={char.firstName} 
                  last={char.lastName} 
                  age={char.age} 
                  cancelEdit={this.cancelEdit} 
                  finishEdit={this.finishEdit}
                  /> 
                  : 
            <div style={{"display": "flex","flex-direction": "row"}}>
                <div className="char-show-fieldnames" style={{ "display": "flex", "flex-direction": "column", "align-items": "flex-end"}}>
                    <span className="char-vital-fieldname">First Name:</span> 
                    <span className="char-vital-fieldname">Last Name:</span>
                    <span className="char-vital-fieldname">Race:</span>
                    <span className="char-vital-fieldname">Age:</span>
                </div>
                <div className="char-show-data" style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flexStart" }}>
                    <span className="char-vital"> <span className="be-capitalized">{char.firstName}</span></span>
                    <span className="char-vital"><span className="be-capitalized">{char.lastName}</span></span>
                    <span className="char-vital"><span className="be-capitalized">{char.ancestry}</span></span>
                    <span className="char-vital"> <span>{char.age}</span></span>
                </div>
                
            </div>}
                {(!this.state.editingPersonal && creatorMatch) && <button onClick={this.editCharacter} name="Personal">Edit</button>}
             
            <h2>Game Information</h2>
            <div style={{ "display": "flex", "flexDirection": "row" }}>
                <div className="char-show-fieldnames" style={{ "display": "flex", "flex-direction": "column", "align-items": "flex-end" }}>
                    <span className="char-vital-fieldname">Player:{' '}</span>
                    <span className="char-vital-fieldname">Class:{' '}</span>
                    <span className="char-vital-fieldname">Level:{' '}</span>
                </div>

                <div className="char-show-data" style={{ "display": "flex", "flex-direction": "column", "justify-content": "flex-start" }}>
                    <span className="char-vital">{char.user.username} </span>
                    <span className="be-capitalized char-vital">{char.class}</span>
                    <span className="char-vital">{char.level}</span>
                </div>
            </div>
            
          
          </div>

          <div className="char-statline">
            <h2>Ability Scores</h2>
            <h4><span className="char-vital-fieldname">STR:</span> {char.statline.strength}</h4>
            <h4><span className="char-vital-fieldname">DEX:</span> {char.statline.dexterity}</h4>
            <h4><span className="char-vital-fieldname">CON:</span> {char.statline.constitution}</h4> 
            <h4><span className="char-vital-fieldname">INT:</span> {char.statline.intelligence}</h4>
            <h4><span className="char-vital-fieldname">WIS:</span> {char.statline.wisdom}</h4>
            <h4><span className="char-vital-fieldname">CHA:</span> {char.statline.charisma}</h4>
          </div>
            <div className="char-bio-show">
                <h3>Biography</h3>
                {this.state.editingBio ? <EditBio bio={char.bio}  id={char.id} cancelEdit={this.cancelEdit} finishEdit={this.finishEdit}/> : <p id="char-bio">{char.bio}</p>}
                {(!this.state.editingBio && creatorMatch) && <button onClick={this.editCharacter} name="Bio">Edit</button>}
            </div> 
        </div>
        <div className="char-cp">
            {creatorMatch && <div>
                <button className="char-delete" onClick={this.openConfirmationModal} >Delete Character</button>
            </div>
            }
        </div>

        {this.state.showModal && ( 
            <div className="confirmation-modal">
                <div className="confirmation-dialog">
                    <h1>Confirm Deletion</h1>
                    <h3>Are you sure you want to delete {char.firstName} {char.lastName}???</h3>
                    <button className="confirm-btn" onClick={this.sakujo} value={char.id}>Yes</button>
                    <button className="confirm-btn" onClick={this.closeConfirmationModal}>No</button>
                </div>
            </div> 
            )}
            {(this.state.editingPersonal || this.state.editingBio) && <div className="edit-overlay" />}
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