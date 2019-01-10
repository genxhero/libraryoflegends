import React, { Component } from 'react'
import { throws } from 'assert';
import { timeout } from 'async';


const ACOLYTE = {
    name: "Acolyte",
    mustHaves: [
        "constitution",
        "wisdom"
    ],
    description: "You spent your early days in a religious monastery or cloister. You may have traveled out into the world to spread the message of your religion or because you cast away the teachings of your faith, but deep inside you’ll always carry the lessons you learned."
}

const ACROBAT = {
    name: "Acrobat",
    mustHaves: [
        "strength",
        "dexterity"
    ],
    description: "In a circus or on the streets, you earned your pay by performing as an acrobat. You might have turned to adventuring when the money dried up, or when you learned to put skills to better use."
}

const ANIMALWHISPERER = {
    name: "Animal Whisperer",
    mustHaves: [
        "wisdom", 
        "charisma"
    ],
    description: "You have always felt a connection to animals, and it was only a small leap to learn to train them. As you travel, you continuously encounter different creatures, befriending them along the way."
}

const BARKEEP = {
    name: "Barkeep",
    mustHaves: [
        "constitution",
        "charisma"
    ],
    description: "You have five specialties: hefting barrels, polishing steins, drinking, drinking, and drinking. You ran or worked in a bar, where you learned how to hold your liquor and rowdily socialize."
}

const BLACKSMITH = {
    name: "Blacksmith",
    mustHaves: [
        "strength",
        "intelligence"
    ],
    description: "You were a blacksmith or a blacksmith’s apprentice, and during countless hours toiling at the forge, you learned how to smith armor and weapons. Perhaps you worked hard each day and dreamed of adventure each night, or perhaps the adventuring life was thrust upon you by a pivotal event."
}

const CRIMINAL = {
    name: "Criminal",
    mustHaves: [
        "dexterity",
        "intelligence"
    ],
    description: "As an unscrupulous independent or as a member of an underworld organization, you lived a life of crime. You might have become an adventurer to seek redemption, to escape the law, or simply to get access to bigger and better loot."
}

const ENTERTAINER = {
    name: "Entertainer",
    mustHaves: [
        "dexterity",
        "charisma"
    ],
    description: "Through an education in the arts or sheer, dogged practice, you learned to entertain crowds. You might have been an actor, a dancer, a musician, a magician, or any other sort of performer."
}

const FARMHAND = {
    name: "Farmhand",
    mustHaves: [
        "constitution",
        "wisdom"
    ],
    description: "With a strong back and an understanding of seasonal cycles, you tilled the land and tended crops. Your farm could have been razed by invaders, you could have lost the family tying you to the land, or you might have simply tired of the drudgery, but at some point you became an adventurer."
}

const GLADIATOR = {
    name: "Farmhand",
    mustHaves: [
        "strength",
        "charisma"
    ],
    description: "The bloody games of the arena taught you the art of combat.  Before you attained true fame, you departed—or escaped—the arena to explore the world. Your skill at drawing both blood and a crowd’s attention pay off in a new adventuring life."
}

class BackgroundPane extends Component {
    constructor(props) {
        super(props);
        this.backgrounds = {
            acolyte: ACOLYTE,
            acrobat: ACROBAT,
            barkeep: BARKEEP,
            entertainer: ENTERTAINER,
            criminal: CRIMINAL,
            animalwhisperer: ANIMALWHISPERER,
            blacksmith: BLACKSMITH,
            farmhand: FARMHAND,
            gladiator: GLADIATOR
        }
        this.passTheProps = this.passTheProps.bind(this);
        this.firstChoice = this.firstChoice.bind(this);
        this.describeMeMaybe = this.describeMeMaybe.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.secondChoice = this.secondChoice.bind(this);
        this.state = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }

    firstChoice(event){
        // debugger;
       if (this.state.chosen === true) {

        return (
        <div>
            <select className="freebie-selector" name="background-freebs-first">
                     <option value="blank"></option>
                     <option value={this.state.background.mustHaves[0]}>{this.state.background.mustHaves[0]}</option>
                     <option value={this.state.background.mustHaves[1]}>{this.state.background.mustHaves[1]}</option>
                 </select>
        </div>);

       } else {
           return <div>
           </div>
       }
    }

    secondChoice(event){
        // debugger;
        if (this.state.firstPicked === true) {
            const stats = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

            return (
            <div>
                <select className="freebie-selector" name="background-freebs-second">
                         <option value="blank"></option>
                         {
                             stats.map( (score) => {
                                 if (score != this.state.firstFreeb ){
                                    return (<option key={`${score}69`}value={score}><span className="be-capitalized">{score}</span></option>);
                                 }
                             })
                         }

                     </select>
            </div>);
    
           } else {
               return <div>
               </div>
           }
    }

    passTheProps(event){
        const newState = this.state;
        // debugger;
        newState[newState.firstFreeb[0]] = 2;
        newState[newState.secondFreeb[0]] = 2;
        this.props.nextPane(newState);
    }

    handleChange(event){
        // debugger;
        switch (event.target.name){
            case "background":
            this.setState({
                background: this.backgrounds[event.target.value.toLowerCase().replace(/\s/g, '')],
                chosen: true,
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intelligence: 0,
                wisdom: 0,
                charisma: 0
            });
            break;
            case "background-freebs-first":
               this.setState({
                   firstPicked: true,
                   secondPicked: false,
                   secondFreeb: "",
                   firstFreeb: [event.target.value]
               });
            break;
            case "background-freebs-second":
            this.setState({
                secondPicked: true,
                secondFreeb: [event.target.value]
            });
         break;

        }

    }

    describeMeMaybe(){
    //    debugger;
       console.log("I know I just coded you, and this is crazy, but here's my debug, so describe me, maybe?");
        if (this.state.background){
            return (
            <div className="background-description">
                <p>{this.state.background.description}</p>
                <p> Your days as a {this.state.background.name} have granted you a +2 bonus in two ability scores, one of which must be either {this.state.background.mustHaves[0]} or {this.state.background.mustHaves[1]}  </p>
             </div>
            );
        } else {
          return (
            <div className="background-description">
            Desription of background will appear here upon selection.
            </div>
          );
        }
    }

    submitMeMaybe(){
        if (this.state.secondPicked && this.state.firstPicked){
            return ( 
                <input type="submit" className="submit"  value="NEXT">
                </input>
            )
        }
    }

    render() {
        // debugger;
        return (
            <div className="char-creation-pane">
                <p>Please select a background for your character from the dropdown list.</p>
                <form onSubmit={this.passTheProps} onChange={this.handleChange}> 
                  <select className="bg-selector" name="background">
                     <option value="blank"></option>
                     {
                       Object.values(this.backgrounds).map( (bg) => 
                       <option key={`${Date.now}${bg.name}`}
                               value={`${bg.name}`}
                       >
                       {bg.name}
                       </option>
                       )
                       }
                  </select>
                    {this.describeMeMaybe()}
                    {this.firstChoice()}
                    {this.secondChoice()}
                    {this.submitMeMaybe()}
                </form>
              

    
            </div>
        )
    }
}

export default BackgroundPane;