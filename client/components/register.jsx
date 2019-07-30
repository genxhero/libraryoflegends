import SIGNUP_MUTATION from "./session_mutations";
import React, { Component } from 'react'

class Register extends Component {

    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser() {
        console.log("Saving user..but not really")
    }

    render() {
        return (
            <div>
               <form onSubmit={this.saveUser}>
                   <input type="text" />
                   <input type="text"/> 

                   <input type="submit"></input>
               </form>
            </div>
        )
    }
}
