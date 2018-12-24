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
        }
        this.applyPersonal = this.applyPersonal.bind(this);
        this.applyAncestry = this.applyAncestry.bind(this);
        this.panes = [<PersonalPane nextPane={this.applyPersonal} />, <AncestryPane nextPane={this.applyAncestry} />, <BackgroundPane nextPane={this.shiftPane} />, <ClassPane nextPane={this.shiftPane}/>];
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

    applyAncestry(personal){
        this.setState({
            pane: this.state.pane + 1,
            strength: this.state.strength + personal.strength,
            dexterity: this.state.dexterity + personal.dexterity,
            constitution: this.state.constitution + personal.constitution,
            intelligence: this.state.intelligence + personal.intelligence,
            wisdom: this.state.wisdom + personal.wisdom,
            charisma: this.state.charisma + personal.charisma,
            ancestryDone: true
        });
    }

    save(){

    }

  render() {
    return (
      <div className="char-creation-page">
        {this.panes[this.state.pane]}
        <div className="stats-tally">
            <div className="stat-single">STR: {this.state.strength}</div>
            <div className="stat-single">DEX: {this.state.dexterity} </div>
            <div className="stat-single">CON: {this.state.constitution}</div> 
            <div className="stat-single">INT: {this.state.wisdom}</div>
            <div className="stat-single">CHA: {this.state.charisma}</div>
        </div>
        <div className="personal-tally">
              <div>{this.state.firstName}</div>
              <div>{this.state.lastName}</div>
              <p>{this.state.bio}</p>
        </div>
      </div>
    )
  }
}

export default CharCreate;
