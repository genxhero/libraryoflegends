import React, { Component } from 'react';
import Classes from './classes';

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