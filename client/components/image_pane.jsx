import React, { Component } from 'react';

class ImagePane extends Component {

    constructor(props) {
        super(props)
        this.state = {image: null, fileTooBig: false}
        this.passTheProps = this.passTheProps.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    passTheProps(){
        event.preventDefault();
        this.props.nextPane(this.state)
    }

    handleFileChange(e) {
        const file = e.target.files[0];
        console.log(file)
        if (file.size > 500000) {
          this.setState({fileTooBig: true})
          return false;
       }
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.setState({ image: file, photoURL: fileReader.result, fileTooBig: false});
        }
        fileReader.readAsDataURL(file);


      }

    render () {
        return (
          <div className="char-creation-pane"> 
            <h1>Please Select a Picture for Your Character</h1>
            <form className="char-form" onSubmit={this.passTheProps}>   
                <input className="char-form-image"type="file"  onChange={this.handleFileChange} />
                <ul className="error-zone">
                  {this.state.fileTooBig && <li>File Size must be 500 kB or less</li>}
                </ul>
                <input type="submit" className="submit" value="NEXT" disabled={!this.state.image} />
            </form>
          </div>
        );
    }
}

export default ImagePane;