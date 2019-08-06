import React, { Component } from 'react';

class ImagePane extends Component {

    constructor(props) {
        super(props)
        this.passTheProps = this.passTheProps.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    passTheProps(){
        event.preventDefault();
        this.props.nextPane(this.state.image)
    }

    handleFileChange(e) {
        console.log("I am changing the dagone file");
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.setState({ image: file, photoURL: fileReader.result});
        }
    
        fileReader.readAsDataURL(file);
      }

    render () {
        return (
          <div className="char-creation-pane"> 
            <h1>photo upload is work in progress</h1>
            <form className="char-form" onSubmit={this.passTheProps}>   
                <input className="char-form-image"type="file"  onChange={this.handleFileChange} />
                <input type="submit" className="submit" value="NEXT" />
            </form>
          </div>
        );
    }
}

export default ImagePane;