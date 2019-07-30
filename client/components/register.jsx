import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            invalidPass: null,
            passwordsMatch: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser() {
        event.preventDefault();
        this.props.mutate({
            variables: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
                },
          }).then( hashHistory.push('/'));
    }

    handleFormChange(field) {
        return event => this.setState({
          [field]: event.currentTarget.value
        });
      }

    render() {
        return (
            <div>
               <form onSubmit={this.saveUser}>
                   <input type="text" value={this.state.username} onChange={this.handleFormChange('username')}/>
                   <input type="text" value={this.state.email} onChange={this.handleFormChange('email')}/>
                   <input type="text"value={this.state.password} onChange={this.handleFormChange('password')}/>
                   <input type="text"value={this.state.password2} onChange={this.handleFormChange('password2')}/> 
                   <input type="submit"></input>
               </form>
            </div>
        );
    }
}

const mutation = gql`
mutation SignupMutation($email: String!, $password: String!, $username: String!) {
  addUser(email: $email, password: $password, username: $username) {
    id
    username
    email
  }
}`

export default graphql(mutation)(Register);