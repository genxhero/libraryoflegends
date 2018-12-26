import React, { Component } from 'react'

//Future versions of this code will have each class cotained in its own file, perhaps even a database schema? Schema might be overdoing it.

const Fighter = {
     name: "fighter",
     keyAbility: ["strength", "dexterity"]
}

const Rogue = {
    name: "rogue",
    keyAbility: ["strength", "dexterity"]
}

const Wizard = {
    name: 'wizard',
    keyAbility: "intelligence"
}

class ClassPane extends Component {
    constructor(props) {
        super(props);
        this.classes = [Fighter, Rogue, Wizard];
        this.passTheProps = this.passTheProps.bind(this)
    }

    passTheProps(){
        newState = this.state;
        this.props.nextPane(newState);
    }

    render() {
        return (
            <div className="char-creation-pane">
                <p>After becoming an adventurer, which of the following paths did you choose to embark upon? </p>           
            </div>
        )
    }
}

export default ClassPane;