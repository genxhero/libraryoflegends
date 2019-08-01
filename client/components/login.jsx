import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {hashHistory} from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
        }
        // This format is far, far easier to debug than using the arrow methods.
        this.handleFormChange = this.handleFormChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleFormChange(field) {
        return event => this.setState({
          [field]: event.currentTarget.value,
        });
      }

      login() {
        event.preventDefault();
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password
                },
          }).then( hashHistory.push('/'));
    }

    render() {
        return (
            <div className="session-page">
               <form onSubmit={this.login} className="session-form">
                   <h1>Log In</h1>
                   <input className="auth-field" type="text" value={this.state.email} onChange={this.handleFormChange('email')} placeholder="Email"/>
                   <input className="auth-field" type="password"value={this.state.password} onChange={this.handleFormChange('password')} placeholder="Password"/>
                   <div className="form-footer"> 
                     <ul className="error-zone">
                     </ul>
                   <input className="submit" type="submit" />
                   </div>
               </form>
            </div>
        )
    }
}

const mutation = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    username
  }
}`

export default graphql(mutation)(Login);