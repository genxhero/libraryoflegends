import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {hashHistory} from 'react-router';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
        }
        // This format is far, far easier to debug than using the arrow methods.
        this.saveUser = this.saveUser.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    saveUser() {
        event.preventDefault();
        this.props.mutate({
            variables: {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
                }
          }).then( hashHistory.push('/'));
    }

    handleFormChange(field) {
        return event => this.setState({
          [field]: event.currentTarget.value,
        });
      }


      validatePassword(password) {
        if (password === "password") {
          return false;
        } else if (password.length < 8) {
          return false;
        } else {
          return true;
        }
      }


    render() {
        return (
            <div className="session-page">
               <form onSubmit={this.saveUser} className="session-form">
                   <h1>Sign Up</h1>
                   <input className="auth-field" type="text" value={this.state.username} onChange={this.handleFormChange('username')} placeholder="Username"/>
                   <input className="auth-field" type="text" value={this.state.email} onChange={this.handleFormChange('email')} placeholder="Email"/>
                   <input className="auth-field" type="password"value={this.state.password} onChange={this.handleFormChange('password')} placeholder="Password"/>
                   <input className="auth-field" type="password"value={this.state.password2} onChange={this.handleFormChange('password2')} placeholder="Confirm Password" /> 
                   <div className="form-footer"> 
                     <ul className="error-zone">
                       {this.state.password !== this.state.password2  && <li> <span>Passwords must match</span></li>}
                       {!this.validatePassword(this.state.password) &&   <li> <span>Invalid Password</span></li>}
                       {this.state.password.toLowerCase() === "password" && <li><span className="a-special-hell">PASSWORD IS NOT A VALID PASSWORD!!!!</span></li>}
                     </ul>
                   <input className="submit" type="submit" disabled={this.state.password !== this.state.password2 || !this.validatePassword(this.state.password)}/>
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