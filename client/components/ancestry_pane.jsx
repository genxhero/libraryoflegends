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
            freebs: [],
        }
        this.displayChoices = this.displayChoices.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.passTheProps = this.passTheProps.bind(this);
        this.humanChoices = this.humanChoices.bind(this);
        this.elfChoices = this.elfChoices.bind(this);
    }

    selectFreeb(){
        let newArr = this.state.freebs;
        newArr.push(event.target.value);
        this.setState({
            freebs: newArr
        });

    }

    deselectFreeb(){
        let newArr = this.state.freebs;
        newArr.splice(newArr.indexOf(event.target.value), 1);
        this.setState({
            freebs: newArr
        });
    }

    displayChoices(){
        // debugger;
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
        // debugger;
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    changeSelection(event){
        let ass = "ass";
        debugger;
        if (event.target.name === "freebie-selector"){
            let newArr = [event.target.value];
            console.log("new Freebs:", newArr);
                this.setState({
                    freebs: newArr
            });
            
          
        } else if (event.target.name === "freebie-checkbox") {
            let newArr = this.state.freebs;
            if (event.target.checked) {
                newArr.push(event.target.value)
                console.log("new Freebs:", newArr);
              }
              else {
                newArr.splice(newArr.indexOf(event.target.value), 1)
                console.log("new Freebs:", newArr);
              }
              this.setState({
                  freebs: newArr
              })
        } else {
            this.setState({
                selected: event.target.value,
                freebs: []
                //freebie points are reset in the event that ancestry should get changed
            });
        }
    }



    elfChoices(){
       return (
        <div className="freebie-choices">
            <p>Fey and timeless, elves are highly intelligent and agile but slight of frame.</p>
            <p>+2 Dexterity, +2 Intelligence, -2 Constitution,
                <span className="greenie"> +2 to one ability score of your choice </span>
            </p>
            <p>Please select which of three ability scores you'd like to receive a +2 increase</p>
           
            <select name="freebie-selector">
                    <option value="strength">Strength</option>
                    <option value="wisdom">Wisdom</option>
                    <option value="charisma">Charisma</option>
                </select>
                <input type="submit" value="Next"></input>
        </div>
       );
    }

    humanChoices(){
        // debugger;
        return (
            <div className="freebie-choices">
                <p>Extremely diverse and industrious; you know the drill.</p>
                <p>+2 to two unique ability scores of your choice</p>
                <p>Please check two ability scores from the list below</p>

                <label className="pure-checkbox" >
                 <input type="checkbox" name="freebie-checkbox" value="strength" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("strength")}/> Strength
                </label>
                <label className="pure-checkbox">
                 <input type="checkbox" name="freebie-checkbox" value="dexterity" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("dexterity")}/> Dexterity
                </label>
                <label className="pure-checkbox">
                 <input type="checkbox" name="freebie-checkbox" value="constitution" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("constitution")}/> Constitution
                </label>
                <label className="pure-checkbox">
                 <input type="checkbox" name="freebie-checkbox" value="intelligence" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("intelligence")}/> Intelligence
                </label>
                <label className="pure-checkbox">
                 <input type="checkbox" name="freebie-checkbox" value="wisdom" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("wisdom")}/> Wisdom
                </label>
                <label className="pure-checkbox">
                 <input type="checkbox" name="freebie-checkbox" value="charisma" disabled={this.state.freebs.length === 2 && !this.state.freebs.includes("charisma")}/> Charisma
                </label>
             
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


{/* <label>
<input className="freebie" type="radio" value="strength" checked={this.state.freebs.includes('strength')}/>
            Strength
</label>
<label>
<input className="freebie" type="radio" value="dexterity" checked={this.state.freebs.includes('dexterity')}/>
            Dexterity
</label>
<label>
<input className="freebie" type="radio" value="constitution" checked={this.state.freebs.includes('constitution')}/>
            Constitution
</label>
<label>
<input className="freebie" type="radio" value="intelligence" checked={this.state.freebs.includes('intelligence')}/>
            Intelligence
</label>

<label>
<input className="freebie" type="radio" value="wisdom" checked={this.state.freebs.includes('wisdom')}/>
            Wisdom
</label>
<label>
<input className="freebie" type="radio" value="charisma" checked={this.state.freebs.includes('charisma')}/>
            Charisma
</label> */}