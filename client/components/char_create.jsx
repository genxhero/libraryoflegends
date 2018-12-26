import React, { Component } from 'react'
import { timesSeries } from 'async';
import AncestryPane from './ancestry_pane';
import BackgroundPane from './background_pane';
import ClassPane from './class_pane';
import PersonalPane from './personal_pane';

class CharCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            pane: 0,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            personalDone: false,
            ancestryDone: false,
            classDone: false,
            ancestry: ""
        }
        this.applyPersonal = this.applyPersonal.bind(this);
        this.applyAncestry = this.applyAncestry.bind(this);
        this.applyBackround = this.applyAncestry.bind(this);
        this.applyClass = this.applyClass.bind(this);
        this.panes = [<PersonalPane nextPane={this.applyPersonal} />, <AncestryPane nextPane={this.applyAncestry} />, <BackgroundPane nextPane={this.applyBackround} />, <ClassPane nextPane={this.applyClass}/>];
    }

    applyPersonal(personal){
    
        this.setState({
            pane: this.state.pane + 1,
            firstName: personal.firstName,
            lastName: personal.lastName,
            bio: personal.bio,
            personalDone: true
        });
    }

    applyAncestry(ancestry){
        this.setState({
            pane: this.state.pane + 1,
            strength: this.state.strength + ancestry.strength,
            dexterity: this.state.dexterity + ancestry.dexterity,
            constitution: this.state.constitution + ancestry.constitution,
            intelligence: this.state.intelligence + ancestry.intelligence,
            wisdom: this.state.wisdom + ancestry.wisdom,
            charisma: this.state.charisma + ancestry.charisma,
            ancestry: ancestry.selected,
            ancestryDone: true
        });
    }

    applyBackround(background){

    }

    applyClass(classPojo){

    }

    save(){

    }

  render() {
    return (
      <div className="char-creation-page">
        {this.panes[this.state.pane]}
     

        <div className="tally-pages">
            <div className="stats-tally">
                <h3 className="page-header">Ability Scores</h3>
                <div className="stat-single">STR: {this.state.strength}</div>
                <div className="stat-single">DEX: {this.state.dexterity} </div>
                <div className="stat-single">CON: {this.state.constitution}</div> 
                <div className="stat-single">INT: {this.state.intelligence}</div>
                <div className="stat-single">WIS: {this.state.wisdom}</div>
                <div className="stat-single">CHA: {this.state.charisma}</div>
            </div>
            <div className="personal-tally">
                <h3 className="page-header">Biography</h3>
                <div>First Name: <span className="be-capitalized">{this.state.firstName}</span> </div>
                <div>Last Name: <span className="be-capitalized">{this.state.lastName}</span> </div>
                <p>{this.state.bio}</p>
            </div>

            <div className="ancestry-tally"> 
                <h3 className="page-header">Ancestry</h3>
                <div>Ancestry: <span className="be-capitalized"> {this.state.ancestry}</span> </div>
                <div>Eventually, this area will be filled with a snippet depending on the ancstry chosen, perhaps making a graphql call to my mongo database. who knows. Mongo only pawn in game of life.</div>     
            </div>
        </div>
      </div>
    )
  }
}

export default CharCreate;
