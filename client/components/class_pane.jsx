import React, { Component } from 'react';
import Classes from './classes';

//Future versions of this code will have each class cotained in its own file, perhaps even a database schema? Schema might be overdoing it.

const Alchemist = {
    name: "alchemist",
    keyAbility: "intelligence",
    description: "You're basically Geralt of Rivia."
}

const Barbarian = {
    name: "barbarian",
    keyAbility: "strength",
    description: "Civilization...who needs it? You are a warrior driven by rage, and you know what is best in life.  You join the ranks of such legendary wild men as Enkidu, Conan, and Wulfgar."
}

const Bard = {
    name: "bard",
    keyAbility: "charisma",
    description: "You inspire courage everywhere you go with your poetry and song. The minstrel of Sir Robin, William Shakespeare, and Makoto Naegi"
}

const Cleric = {
    name: "cleric",
    keyAbility: "wisdom",
    description: "You are a conduit of divine power.  At the behest of your chosen deity you embark upon a quest.  Insert example of famous holy men here."
}

const Druid = {
    name: "druid",
    keyAbility: "wisdom",
    description: "Nature is your bread and butter, and you are an expert baker."
}

const Fighter = {
     name: "fighter",
     keyAbility: ["strength", "dexterity"],
     description: "You are a fighter; that is what you do. You fight. Bred for battle, you walk the path of warriors trodden by such figures as Kansuke Yamamoto, Achilles, Gimli, and many more throughout history, mythology, and fiction."
}

const Monk = {
    name: "monk",
    keyAbility: ["dexterity", "strength"],
    description: "You are a practitioner of martial arts dedicated to perfecting yourself.  You rank among such heroes as Bruce Lee, Chuck Norris, and the Karate Kid"
}

const Paladin = {
    name: "paladin",
    keyAbility: "strength",
    description: "A holy knight errant on a divine quest, tasked with helping the weak and protecting the innocent along the way."
}

const Ranger = {
    name: "ranger",
    keyAbility: "dexterity",
    description: "A warrior more at home in the wilds than in the cities.  You join the ranks of such heroes as Aragorn and Drizzt Do'Urden"
}

const Rogue = {
    name: "rogue",
    keyAbility: ["strength", "dexterity"],
    description: "Full of cunning, guille, and a healthy dose of swagger, you get things done with skill rather than brute force.  You follow in the footsteps of such great characters as Han Solo, Robin Hood, and ???"
}

const Sorcerer = {
    name: "sorcerer",
    keyAbility: "charisma",
    description: "The power of your blood has gifted you with a mastery of magic that wizards can only dream of."
}

const Wizard = {
    name: 'wizard',
    keyAbility: "intelligence",
    description: "The boundless powers of the arcane arts are your bread and butter.  The wizard has long been an advisor to heroes and kings, and includes such names as Gandalf, Merlin, Elminster, and Harry Potter"
}

// Alchemist;
// Barbarian;
// Bard;
// Cleric;
// Druid;
// Fighter;
// Monk;
// Paladin;
// Ranger;
// Rogue;
// Sorcerer;
// Wizard;

class ClassPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            selected: null
        }
        // this.classes = [Alchemist, Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Wizard];
        this.classes = Classes;
        this.selectClass = this.selectClass.bind(this);
        this.passTheProps = this.passTheProps.bind(this);
        this.describeMeMaybe = this.describeMeMaybe.bind(this);
        this.choiceMaybe = this.choiceMaybe.bind(this);
        this.nextPaneMaybe = this.nextPaneMaybe.bind(this);
        this.chooseFreebie = this.chooseFreebie.bind(this);
    }

    passTheProps(){
        event.preventDefault();
        const newState = this.state;
        if (newState.selected.name === "fighter" || newState.selected.name === "rogue" || newState.selected.name === "monk"){
             newState[this.state.chosen] = 2;
        } else {
            newState[this.state.selected.keyAbility] = 2;
        }
        this.props.nextPane(newState);
        //{strength: 2 } the rest are zeroes
    }

    choiceMaybe(){
        if (this.state.selected === null){
            return <div></div>
        } else if (this.state.selected.name === "fighter" || this.state.selected.name === "monk" || this.state.selected.name === "rogue") {
            return (
                <div className="class-freeb"> 
                    <p>Please choose whether to focus on {this.state.selected.keyAbility[0]} or {this.state.selected.keyAbility[1]}</p>
                  <select>
                        <option></option>
                        <option className="be-capitalized" value={this.state.selected.keyAbility[0]}>{this.state.selected.keyAbility[0]}</option>
                        <option className="be-capitalized" value={this.state.selected.keyAbility[1]}>{this.state.selected.keyAbility[1]}</option>
                  </select>
                </div>
            );
        } else {
           return (
               <div className="class-freeb">
                   <p>A {this.state.selected.name} gains a +2 bonus to their {this.state.selected.keyAbility} score.</p>
               </div>
           )
        }
    }

    chooseFreebie(event){
        event.preventDefault();
        this.setState({
            freebChosen: true,
            chosen: event.target.value
        })
    }

    nextPaneMaybe(){
        //Check to see if a class has been chosen
        //Then check to see if it is one of 3 edge cases
        //If it's not a bloody edge case, return the submit button.
        //If it is, check to see whether the selection for the two things has been made.
        if (this.state.selected != null){
            if (this.state.selected.name === "fighter" || this.state.selected.name === "monk" || this.state.selected.name === "rogue"){
                if (this.state.freebChosen === true){
                    return (
                        <input type="submit" className="submit" value="NEXT">
                        </input>
                    );
                } else {
                    return <div></div>
                }
            } else {
                return (
                    <input type="submit" className="submit" value="NEXT">
                    </input>
                );
            }
        } else {
            return <div></div>
        }
    }

    describeMeMaybe(){
        if (this.state.selected === null) {
            return( <div className="class-description">
                <p>When you have selected your character's class, a description will appear right here</p>
            </div>)
        } else {
            return (
                <div className="class-description">
                       {this.state.selected.description}
                </div>
            );
        }
    }

    selectClass(event){
        event.preventDefault();
        this.setState({ selected: this.classes[parseInt(event.target.id)] })
    }

  

    render() {
        return (
        <div className="char-creation-pane"> 
           <h1 className="pane-title">Character Class</h1>
            <div className="class-list"> 
                {this.classes.map(charClass => (
                    <div className={this.state.selected === charClass ? "class-selected" : "class-selector"} 
                         key={`${Date.now}${charClass.name}420`} 
                         onClick={this.selectClass} 
                         id={this.classes.indexOf(charClass)}>
                        {charClass.name.toUpperCase()}
                    </div>
                ))}

            </div>
        <form onChange={this.chooseFreebie} onSubmit={this.passTheProps}>
            <div className="description">
                {this.describeMeMaybe()}
            </div>

            {this.choiceMaybe()}
            {this.nextPaneMaybe()}
            </form>
          </div>);
    }
}

export default ClassPane;