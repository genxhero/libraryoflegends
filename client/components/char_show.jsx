import React, { Component } from 'react'
import { graphql, compose} from "react-apollo";
import gql from 'graphql-tag';
import query from "../queries/fetchchar";
import index from "../queries/fetchchars";
import currentUser from "../queries/current_user";
import {hashHistory} from 'react-router';
import $ from 'jquery';
import EditBio from './edit_bio';

class CharShow extends Component {

    constructor(props){
        super(props);
        // Bio state is required for in-line editing.
        this.state = {
            showModal: false, 
            editing: false,
            bio: ""
        }
        this.sakujo = this.sakujo.bind(this);
        this.editCharacter = this.editCharacter.bind(this);
        this.openConfirmationModal = this.openConfirmationModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.showBioEdit = this.showBioEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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
    editCharacter(){
        this.setState( () => { return {editing: true}})
    }

    showBioEdit(){
         
    }

     cancelEdit(){
        this.setState(() => { return { editing: false } })
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
            <div className="char-bio">
                <h3>Biography</h3>
                {this.state.editing ? <EditBio bio={char.bio} id={char.id} cancelEdit={this.cancelEdit} /> : <p>{char.bio}</p>}
            </div> 
        </div>
        <div className="char-cp">
            {creatorMatch && <div>
                <button className="char-delete" onClick={this.editCharacter}>Edit Character</button>
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