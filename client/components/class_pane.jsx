import React, { Component } from 'react'

//Future versions of this code will have each class cotained in its own file, perhaps even a database schema? Schema might be overdoing it.

const Fighter = {
     name: "fighter",
     keyAbility: ["strength", "dexterity"],
     description: "You are a fighter; that is what you do. You fight. Bred for battle, you walk the path of warriors trodden by such figures as Kansuke Yamamoto, Achilles, Gimli, and many more throughout history, mythology, and fiction."
}

const Rogue = {
    name: "rogue",
    keyAbility: ["strength", "dexterity"],
    description: "Full of cunning, guille, and a healthy dose of swagger, you get things done with skill rather than brute force.  You follow in the footsteps of such great characters as Han Solo, Robin Hood, and ???"
}

const Wizard = {
    name: 'wizard',
    keyAbility: "intelligence",
    description: "The boundless powers of the arcane arts are your bread and butter.  The wizard has long been an advisor to heroes and kings, and includes such names as Gandalf, Merlin, Elminster, and Harry Potter"
}

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
        this.classes = [Fighter, Rogue, Wizard];
        this.passTheProps = this.passTheProps.bind(this);
        this.describeMeMaybe = this.describeMeMaybe.bind(this);
    }

    passTheProps(){
        newState = this.state;
        newState[this.state.selected] = 2;
        this.props.nextPane(newState);
        //{strength: 2 } the rest are zeroes
    }

    describeMeMaybe(){
        if (this.state.selected === null) {
            return <div></div>
        } else {
            return (
                <div className="class-description">
                       {this.state.selected.description}
                </div>
            );
        }
    }

    render() {
        return <div className="char-creation-pane">
            <p>
              After becoming an adventurer, which of the following paths
              did you choose to embark upon?{" "}
            </p>
            {this.classes.map(charClass => (
              <div key={`${Date.now}${charClass.name}420`}>
                <span>{charClass.name.toUpperCase}</span>
                <p> {charClass.description} </p>
              </div>
            ))}
          </div>;
    }
}

export default ClassPane;