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
            <div className="register-page">
               <form onSubmit={this.saveUser} className="register-form">
                   <h1>Sign Up</h1>
                   <input className="auth-field" type="text" value={this.state.username} onChange={this.handleFormChange('username')} placeholder="Username"/>
                   <input className="auth-field" type="text" value={this.state.email} onChange={this.handleFormChange('email')} placeholder="Email"/>
                   <input className="auth-field" type="text"value={this.state.password} onChange={this.handleFormChange('password')} placeholder="Password"/>
                   <input className="auth-field" type="text"value={this.state.password2} onChange={this.handleFormChange('password2')} placeholder="Confirm Password" /> 
                   <div className="form-footer"> 
                   <input className="submit" type="submit" />
                   </div>
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