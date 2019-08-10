import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from "react-apollo";
import currentUser from '../queries/current_user';

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
        this.props.mutate({
            variables: { id: this.props.id, bio: this.state.bio },
            refetchQueries: [{ query: currentUser }]
        }).then(
            this.props.finishEdit("Bio")
        );
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
                <button onClick={this.props.cancelEdit} name="Bio">Cancel</button>
            </div>
        );
    }
}
const mutation = gql`
mutation  updateBio($id: String!, $bio: String!) {
  updateBio(id: $id, bio: $bio) {
    id
    bio
  }
}
`;

export default graphql(mutation)(EditBio)