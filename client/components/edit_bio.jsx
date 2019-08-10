import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";

/**
 * REMINDER: Do the backend stuff before this component will even work.
 */

class EditBio extends Component {
    constructor(props){
        super(props)
        this.state = {
            bio: this.props.bio
        }
        this.updateBio = this.updateBio.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    updateText(field) {
        return event => this.setState({
            [field]: event.currentTarget.value,
            // [`${field}Valid`]: field === "bio" ? true : this.validateTextInput(event.currentTarget.value)
        });
    }

    updateBio() {
        console.log("Work in progress")
        this.setState(() => { return { editing: false } })
    }

    render(){
        return(
            <div>
                <textarea
                    className="char-bio-edit"
                    value={this.state.bio}
                    type="text"
                    onChange={this.updateText('bio')} />
                <button onClick={this.updateBio}>Save</button>
                <button onClick={this.props.cancelEdit}>Cancel</button>
            </div>
        );
    }
}
const mutation = gql`
`;

export default graphql(mutation)(EditBio)