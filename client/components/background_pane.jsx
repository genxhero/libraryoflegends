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
            farmer: FARMHAND
        }
        this.passTheProps = this.passTheProps.bind(this);
        this.firstChoice = this.firstChoice.bind(this);
        this.describeMeMaybe = this.describeMeMaybe.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            background: {}
        }
    }

    firstChoice(event){

    }

    passTheProps(event){

    }

    handleChange(event){
        debugger;
        switch (event.target.name){
            case "background":
            this.setState({
                background: this.backgrounds[event.target.value]
            })
        }

    }

    describeMeMaybe(){
         if (this.state.background === {}){
             return <div></div>;
         } else {
              return (
            <div className="background-description">
                  <p>{this.state.background.description}</p>
            </div>
              );
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

                </form>
              
                    {this.describeMeMaybe}
    
            </div>
        )
    }
}

export default BackgroundPane;