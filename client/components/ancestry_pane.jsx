import React, { Component } from 'react'






class AncestryPane extends Component {
    constructor(props) {
        super(props);
        this.state ={
            strength:  0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            freebs: []
        }
        this.displayChoices = this.displayChoices.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.passTheProps = this.passTheProps.bind(this);
        this.humanChoices = this.humanChoices.bind(this);
        this.elfChoices = this.elfChoices.bind(this);
    }

    displayChoices(){
        debugger;
        switch (this.state.selected){
            default:
                return <div>Please select an ancestry to continue</div>;
            case "elf":
                return this.elfChoices();
                break;
            case "human":
                return this.humanChoices();
                break;
        }
    }

    passTheProps() {
        //please pass the props please
        debugger;
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    changeSelection(event){
        debugger;
        this.setState({
            selected: event.target.value
        });

    }



    elfChoices(){
        
       return (
        <div className="freebie-choices">
        <p>Fey and timeless, elves are highly intelligent and agile but slight of frame.</p>
        <p>+2 Dexterity, +2 Intelligence, -2 Constitution,<span className="greenie">+2 to one ability score of your choice</span></p>
          <label>
           <input type="radio" value="strength" checked={this.state.freebs[0] === 'strength'}/>
                        Strength
            </label>
            <label>
            <input type="radio" value="wisdom" checked={this.state.freebs[0] === 'wisdom'}/>
                        Wisdom
            </label>
            <label>
            <input type="radio" value="charisma" checked={this.state.freebs[0] === 'charisma'}/>
                        Charisma
            </label>
               <input type="submit" value="Next"></input>
        </div>
       );
    }

    humanChoices(){
        debugger;
        return (
            <div className="freebie-choices">
                <p>Extremely diverse and industrious; you know the drill.</p>
                <p>+2 to 3 unique ability scores of your choice/span></p>
              
                <input type="submit" value="Next"></input>
            </div>
        );
    }

    render() {
        return (
            <div className="char-creation-pane">
                  <h1>Please select your ancestry </h1>
                  <form className="ancestry-choice"
                    onChange={this.changeSelection}
                    onSubmit={this.passTheProps}
                  >
                    <label>
                        <input type="radio" value="human" checked={this.state.selected === 'human'}/>
                        Human
                    </label>
                    <label>
                        <input type="radio" value="elf" checked={this.state.selected === 'elf'}/>
                        Elf
                    </label>
                    {this.displayChoices()}
                  </form>
            </div>
        )
    }
}

export default AncestryPane;