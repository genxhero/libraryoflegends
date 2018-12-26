import React, { Component } from 'react'
import { throws } from 'assert';

const BLACKSMITH = {
    name: "Blacksmith",
    mustHaves: [
        "strength",
        "intelligence"
    ],
    description: "You were a blacksmith or a blacksmith’s apprentice, and during countless hours toiling at the forge, you learned how to smith armor and weapons. Perhaps you worked hard each day and dreamed of adventure each night, or perhaps the adventuring life was thrust upon you by a pivotal event."
}

const FARMHAND = {
    name: "Farmhand",
    mustHaves: [
        "constitution",
        "wisdom"
    ],
    description: "With a strong back and an understanding of seasonal cycles, you tilled the land and tended crops. Your farm could have been razed by invaders, you could have lost the family tying you to the land, or you might have simply tired of the drudgery, but at some point you became an adventurer."
}

class BackgroundPane extends Component {
    constructor(props) {
        super(props);
        this.backgrounds = {
            blacksmith: BLACKSMITH,
            farmhand: FARMHAND
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
                background: this.backgrounds[event.target.value],
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
        return (
            <div className="char-creation-pane">
                <p>Please select a background for your character from the dropdown list.</p>
                <form onSubmit={this.passTheProps} onChange={this.handleChange}> 
                  <select className="bg-selector" name="background">
                     <option value="blank"></option>
                     <option value="blacksmith">Blacksmith</option>
                    <option value="farmhand">Farmhand</option>
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