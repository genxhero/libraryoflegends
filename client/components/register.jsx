import SIGNUP_MUTATION from "./session_mutations";
import React, { Component } from 'react'
import {graphql} from 'react-apollo';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            invalidPass: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser() {
        this.props.mutate({
            variables: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
                },
          }).then( hashHistory.push('/'));
    }

    render() {
        return (
            <div>
               <form onSubmit={this.saveUser}>
                   <input type="text" />
                   <input type="text"/>
                   <input type="text"/> 
                   <input type="submit"></input>
               </form>
            </div>
        );
    }
}

export default graphql(SIGNUP_MUTATION)(Register);