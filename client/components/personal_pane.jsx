import React, { Component } from 'react'

class PersonalPane extends Component {
    constructor(props){
        super(props);
        this.state = {
             firstName: "",
             lastName:"",
             bio: "",
             gender: "Male",
             age: 0,
             ageValid: null,
             firstNameValid: null,
             lastNameValid: null
        }
        this.updateNumeric = this.updateNumeric.bind(this);
        this.updateText = this.updateText.bind(this);
        this.passTheProps = this.passTheProps.bind(this)
        this.validateNumericInput = this.validateNumericInput.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.allValid = this.allValid.bind(this);
    }
    
    /**
     * We always want our bio field to be valid, we don't want numbers or special characters in our 
     * character names. 
     */
    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: field === "bio" ? true : this.validateTextInput(event.currentTarget.value)
        });
    }

    updateNumeric(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateNumericInput(event.currentTarget.value)
        });
    }

    passTheProps(){
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    validateNumericInput(input) {
        if (input < 0 || isNaN(input)) {
            return false;
        } 
        return true;
    }

    validateTextInput(input) {
        //Lordy, regular expressions are terrible
        const testForSpecial = new RegExp(/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g);
        const testForNumber = new RegExp(/[0-9]/);
        console.log(`Specials: ${testForSpecial}. Numbers: ${testForNumber}`)
        if (testForNumber.test(input) || testForSpecial.test(input)) {
            console.log("False input")
            return false
        }
        return true;
    }

    allValid(){
        console.log(`Age: ${this.state.ageValid}, First: ${this.state.firstNameValid}, Last: ${this.state.lastNameValid}`)
        if (!this.state.ageValid || !this.state.firstNameValid || !this.state.lastNameValid ) {
          return false
        }
        return true;
    }

    render (){ 
     const submitEnabled = this.allValid();
     return (
         <div className="char-creation-pane">
            <form className="char-form" onSubmit={this.passTheProps}>   
                 <label className="personal-input">
                    <span className="label-content">First Name</span>
                    <input className="char-field-long"
                        value={this.state.firstName}
                        placeholder=""
                        type="text"
                        onChange={this.updateText('firstName')}
                    ></input>
                 </label>
                 <label className="personal-input">
                 <span className="label-content">Last Name</span>
                    <input className="char-field-long"
                        value={this.state.lastName}
                        placeholder=""
                        type="text"
                        onChange={this.updateText('lastName')}
                    ></input>
                 </label>
              
                 <label className="personal-input">
                   <span className="label-content">Age</span>
                   <input className="char-field-short"
                        value={this.state.age}
                        placeholder=""
                        type="text"
                        onChange={this.updateNumeric('age')}  
                    ></input>
                 </label>
              
                 <ul className="error-zone">
                     {this.state.ageValid === false && <li>Age must be a positive number</li>}
                     {this.state.firstNameValid === false && <li>Only letters and dashes permitted in the First Name</li>}
                     {this.state.lastNameValid === false && <li>Only letters and dashes permitted in the Last Name</li>}
                 </ul>
                 <label className="personal-input">Biography</label>
                 <textarea className="char-bio-input"
                     value={this.state.bio}
                     placeholder=""
                     type="text"
                     onChange={this.updateText('bio')}
                 ></textarea>
                 <input type="submit" className= "submit" value="NEXT" disabled={!submitEnabled}></input>
            </form>
          
        </div>
    )
  }
}

export default PersonalPane