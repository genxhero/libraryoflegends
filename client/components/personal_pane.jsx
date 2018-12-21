import React, { Component } from 'react'

class PersonalPane extends Component {
    constructor(props){
        super(props);
        this.state = {
             firstName: "",
             lastName:"",
             bio: "",
             gender: "Male",
        }
        this.update = this.update.bind(this);
        this.passTheProps = this.passTheProps.bind(this)
    }
    
    update(field) {
        return event => this.setState({
            [field]: event.currentTarget.value
        });
    }

    passTheProps(){
        //please pass the props please
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    render (){ 
     return (
         <div className="char-creation-pane">
            <form onSubmit={this.passTheProps}> 
                 <input className="char-name"
                     value={this.state.firstName}
                     placeholder=""
                     type="text"
                     onChange={this.update('firstName')}
                 ></input>
                 <input className="char-name"
                     value={this.state.lastName}
                     placeholder=""
                     type="text"
                     onChange={this.update('lastName')}
                 ></input>
                 <label>Please provide a brief biography for your characterr</label>
                 <textarea className="char-bio"
                     value={this.state.bio}
                     placeholder=""
                     type="text"
                     onChange={this.update('bio')}
                 ></textarea>
                 <input type="submit" value="NEXT"></input>
            </form>
            <div className="personal-display">
            <h1>What you've entered so far...</h1>
               Name: {this.state.firstName} {this.state.lastName}
               Bio: {this.state.bio} 
            </div>
        </div>
    )
  }
}

export default PersonalPane