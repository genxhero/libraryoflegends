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
    }
    
    // TODO: validate text input on the front end in some way.
    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: true
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

    render (){ 
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
                         {this.state.ageValid === false && <span>Age must be a positive number</span>}
                 </label>
              

                 <label className="personal-input">Biography</label>
                 <textarea className="char-bio"
                     value={this.state.bio}
                     placeholder=""
                     type="text"
                     onChange={this.update('bio')}
                 ></textarea>

             
                 <input type="submit" className="submit" value="NEXT"></input>
            </form>
          
        </div>
    )
  }
}

export default PersonalPane