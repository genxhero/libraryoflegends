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
            last: this.props.last
        }
        this.updatePersonal = this.updatePersonal.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            // [`${field}Valid`]: field === "bio" ? true : this.validateTextInput(event.currentTarget.value)
        });
    }

    updatePersonal() {
         this.props.mutate({
             variables: { 
                 id: this.props.id, 
                 lastName: this.state.last, 
                 firstName: this.state.first, 
                 age: this.state.age 
                },
             refetchQueries: [{ query: currentUser }]
         }).then(
             this.props.finishEdit("Personal")
         );
    }

    render() {
        return (
            <div className="edit-pane">
                <div>
                    <span>First Name:{' '}<input onChange={this.updateText('first')}/></span>
                    <span>Last Name:{' '}<input onChange={this.updateText('last')} /></span>
                    <span>Age Name:{' '}<input onChange={this.updateText('age')}/></span>
                </div>
                <div className="edit-btn-container">
                    <button onClick={this.updatePersonal}>Save</button>
                    <button onClick={this.props.cancelEdit} name="Personal">Cancel</button>
                </div>

            </div>
        );
    }
}
const mutation = gql`
mutation  updatePersonal($id: String!, $firstName: String!, $lastName: String!, $age: String!) {
  updatePersonal(id: $id, age: $age, lastName: $lastName, firstName: $firstName) {
    id
    lastName
    firstName
    age
  }
}
`;

export default graphql(mutation)(EditPersonal)