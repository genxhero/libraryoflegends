import React, { Component } from 'react';

class ImagePane extends Component {

    constructor(props) {
        super(props)
        this.passTheProps = this.passTheProps.bind(this)
    }

    passTheProps(){
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    render () {
        return (
          <div className="char-creation-pane"> 
            <h1>photo upload is work in progress</h1>
            <form className="char-form" onSubmit={this.passTheProps}>   
                 <input type="submit" className="submit" value="NEXT"></input>
            </form>
          </div>
        );
    }
}

export default ImagePane;