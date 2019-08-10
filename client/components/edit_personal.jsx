import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import currentUser from '../queries/current_user';

/**
 * REMINDER: Do the backend stuff before this component will even work.
 */

class EditPersonal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            age: this.props.age,
            first: this.props.first,
            last: this.props.last,
            lastValid: true,
            firstValid: true,
            ageValid: true
        }
        this.updatePersonal = this.updatePersonal.bind(this);
        this.updateText = this.updateText.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.validateNumericInput = this.validateNumericInput.bind(this);
        this.allFieldsValid = this.allFieldsValid.bind(this);
    }

    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateTextInput(event.currentTarget.value)
        });
    }

    updateNumeric(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            [`${field}Valid`]: this.validateNumericInput(event.currentTarget.value)
        });
    }

    updatePersonal() {
         this.props.mutate({
             variables: { 
                 id: this.props.id, 
                 lastName: this.state.last, 
                 firstName: this.state.first, 
                 age: parseInt(this.state.age) 
                },
             refetchQueries: [{ query: currentUser }]
         }).then(
             this.props.finishEdit("Personal")
         );
    }

    validateNumericInput(input) {
        if (input < 0 || isNaN(input)) {
            return false;
        }
        return true;
    }

    validateTextInput(input) {
        const testForSpecial = new RegExp(/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g);
        const testForNumber = new RegExp(/[0-9]/);
        if (testForNumber.test(input) || testForSpecial.test(input)) {
            return false
        }
        return true;
    }

    allFieldsValid() {
        if (!this.state.lastValid || !this.state.firstValid || !this.state.ageValid) {
            return false;
        }
           return true;
    }

    render() {
        const allFieldsValid = this.allFieldsValid();
        return (
            <div className="edit-pane">
                <div className="edit-multi-field">
                    <span>First Name:{' '}<input onChange={this.updateText('first')} value={this.state.first}/></span>
                    <span>Last Name:{' '}<input onChange={this.updateText('last')} value={this.state.last}/></span>
                    <span>Age:{' '}<input onChange={this.updateNumeric('age')} value={this.state.age}/></span>
                </div>
                <ul className="error-zone">
                    {this.state.ageValid === false && <li>Age must be a positive number</li>}
                    {this.state.firstValid === false && <li>Name may only have letters</li>}
                    {this.state.lastValid === false && <li>Name may only have letters</li>}
                </ul>
                <div className="edit-btn-container">
                    <button onClick={this.updatePersonal} disabled={!allFieldsValid}>Save</button>
                    <button onClick={this.props.cancelEdit} name="Personal">Cancel</button>
                </div>
                

            </div>
        );
    }
}
const mutation = gql`
mutation  updatePersonal($id: String!, $firstName: String!, $lastName: String!, $age: Int!) {
  updatePersonal(id: $id, age: $age, lastName: $lastName, firstName: $firstName) {
    id
    lastName
    firstName
    age
  }
}
`;

export default graphql(mutation)(EditPersonal)