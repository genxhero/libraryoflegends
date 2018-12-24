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
            <form className="char-form" onSubmit={this.passTheProps}>   
                 <label>
                    First Name:
                    <input className="char-name"
                        value={this.state.firstName}
                        placeholder=""
                        type="text"
                        onChange={this.update('firstName')}
                    ></input>
                 </label>
                 <label>
                 Last Name: 
                    <input className="char-name"
                        value={this.state.lastName}
                        placeholder=""
                        type="text"
                        onChange={this.update('lastName')}
                    ></input>
                 </label>
              


                 <label>Please provide a brief biography for your character </label>
                 <textarea className="char-bio"
                     value={this.state.bio}
                     placeholder=""
                     type="text"
                     onChange={this.update('bio')}
                 ></textarea>
                 <input type="submit" value="NEXT"></input>
            </form>
          
        </div>
    )
  }
}

export default PersonalPane