import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router';
import {graphql} from 'react-apollo';
import { timesSeries } from 'async';
import AncestryPane from './ancestry_pane';
import BackgroundPane from './background_pane';
import ClassPane from './class_pane';
import PersonalPane from './personal_pane';
import FreebiePane from './freebie_pane';
import gql from 'graphql-tag';
import query from '../queries/fetchchars';



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
            backgroundDone:false,
            ancestry: "",
            class: "Placeholder"
        }
        this.applyPersonal = this.applyPersonal.bind(this);
        this.applyAncestry = this.applyAncestry.bind(this);
        this.applyBackground = this.applyBackground.bind(this);
        this.applyClass = this.applyClass.bind(this);
        this.applyFreebies = this.applyFreebies.bind(this);
        this.backgroundMaybe = this.backgroundMaybe.bind(this);
        this.saveMeMaybe = this.saveMeMaybe.bind(this);
        this.save = this.save.bind(this);
        this.panes = [<PersonalPane nextPane={this.applyPersonal} />,
             <AncestryPane nextPane={this.applyAncestry} />, 
             <BackgroundPane nextPane={this.applyBackground} />,
              <ClassPane nextPane={this.applyClass}/>, <FreebiePane nextPane={this.applyFreebies}/>];
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

    applyBackground(background){
        this.setState({
            pane: this.state.pane + 1,
            strength: this.state.strength + background.strength,
            dexterity: this.state.dexterity + background.dexterity,
            constitution: this.state.constitution + background.constitution,
            intelligence: this.state.intelligence + background.intelligence,
            wisdom: this.state.wisdom + background.wisdom,
            charisma: this.state.charisma + background.charisma,
            background: background.background,
            bgFreebA: background.firstFreeb,
            bgFreebB: background.secondFreeb,
            backgroundDone: true
        });
    }

    applyClass(classPojo){
                //newState from the class pane
           this.setState({
             class: classPojo.name,
             pane: this.state.pane + 1,
               strength: this.state.strength + classPojo.strength,
               dexterity: this.state.dexterity + classPojo.dexterity,
               constitution: this.state.constitution + classPojo.constitution,
               intelligence: this.state.intelligence + classPojo.intelligence,
               wisdom: this.state.wisdom + classPojo.wisdom,
               charisma: this.state.charisma + classPojo.charisma,
               class: classPojo.selected.name
           });
    }
    applyFreebies(freebies) {
        console.log(freebies);
        debugger;
        this.setState({
          strength: this.state.strength + freebies.strength,
          dexterity: this.state.dexterity + freebies.dexterity,
          constitution: this.state.constitution + freebies.constitution,
          intelligence: this.state.intelligence + freebies.intelligence,
          wisdom: this.state.wisdom + freebies.wisdom,
          charisma: this.state.charisma + freebies.charisma,
          freebiesDone: true
        });
    }

    save(event){
        event.preventDefault();
       this.props.mutate({
         variables: {
             userId: "5c15c379796d623e5ae350f8", //must replace with current user
             firstName: this.state.firstName,
             lastName: this.state.lastName,
             class: this.state.class,
             ancestry: this.state.ancestry,
             background: this.state.background.name,
             statline: {
                 strength: this.state.strength,
                 dexterity: this.state.dexterity,
                 constitution: this.state.constitution,
                 intelligence: this.state.intelligence,
                 wisdom: this.state.wisdom,
                 charisma: this.state.charisma
             },
             level: 1
         },
         refetchQueries: [{ query }]
       }).then( hashHistory.push('/'));
       //put catch down here later
    }

    saveMeMaybe(){
        
        if (this.state.freebiesDone) {
            return (
                <div>
                    <button
                        className="char-submit" 
                        onClick={this.save}
                        value="Save Character"
                    ></button>

                </div>
          
            )
        }  else {
            return <div>
                The function is not working wtf
            </div>
        }
    }

    backgroundMaybe(){
        if (this.state.background) {
            // debugger;
            return (
         <div className="background-tally">
            <h3 className="page-header">Background</h3>
            <div>Background: <span className="be-capitalized"> {this.state.background.name}</span> </div>
            <p>{this.state.background.description}</p>
            <p>Working as a {this.state.background.name} shaped your very development, granting you a +2 to your {this.state.bgFreebA} and {this.state.bgFreebB} scores.</p>
        </div>  
            )
     
        } else {
            return <div>
                The function is not working
            </div>
        }
      
    }

  render() {
    return (
      <div className="char-creation-page">
        {this.panes[this.state.pane]}
        {this.saveMeMaybe()}
     
    </div>
    )
  }
}

const mutation =  gql`
mutation AddCharacter($userId: ID, $firstName: String, $lastName: String, $class: String, $level: Int, $statline: StatLineInput!, $ancestry: String, $background: String){
    addCharacter(userId: $userId, firstName: $firstName, lastName: $lastName, class: $class, level: $level, statline: $statline, ancestry: $ancestry, background: $background)
    {
        id
        firstName
        lastName
        ancestry
        background
        class
       statline {
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
      }
    }
}`;



export default graphql(mutation)(CharCreate);


/* <div className="tally-pages">
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

{this.backgroundMaybe()} */