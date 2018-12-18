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
            charisma: 10
        }
        this.applyPersonal = this.applyPersonal.bind(this);
        this.applyAncestry = this.applyAncestry.bind(this);
        this.panes = [<PersonalPane nextPane={this.applyPersonal} />, <AncestryPane nextPane={this.applyAncestry} />, <BackgroundPane nextPane={this.shiftPane} />, <ClassPane nextPane={this.shiftPane}/>];
    }

    applyPersonal(personal){
        debugger;
        this.setState({
            pane: this.state.pane + 1,
            firstName: personal.firstName,
            lastName: personal.lastName,
            bio: personal.bio,
            gender: personal.gender

        });
    }

    applyAncestry(personal){
        this.setState({
            pane: this.state.pane + 1,

        });
    }

  render() {
    return (
      <div className="char-creation-page">
        {this.panes[this.state.pane]}
      </div>
    )
  }
}

export default CharCreate;
