import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router';
import {graphql, compose} from 'react-apollo';
import AncestryPane from './ancestry_pane';
import BackgroundPane from './background_pane';
import ClassPane from './class_pane';
import PersonalPane from './personal_pane';
import FreebiePane from './freebie_pane';
import ImagePane from './image_pane';
import gql from 'graphql-tag';
import query from '../queries/fetchchars';
import currentUser from '../queries/current_user';
import moment from 'moment';
import axios from 'axios';

const SavePane = (props) => {
    
    return (
        <div className="char-creation-pane">
            {props.saveMeMaybe()}
        </div>
    )
}
 
class CharCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            pane: 0,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            personalDone: false,
            ancestryDone: false,
            classDone: false,
            backgroundDone:false,
            ancestry: "",
            class: "Placeholder",
            image: null
        }
        this.applyPersonal = this.applyPersonal.bind(this);
        this.applyAncestry = this.applyAncestry.bind(this);
        this.applyBackground = this.applyBackground.bind(this);
        this.applyClass = this.applyClass.bind(this);
        this.applyFreebies = this.applyFreebies.bind(this);
        this.applyImage = this.applyImage.bind(this);
        this.backgroundMaybe = this.backgroundMaybe.bind(this);
        this.saveMeMaybe = this.saveMeMaybe.bind(this);
        this.formatFilename = this.formatFilename.bind(this);
        this.save = this.save.bind(this);
        this.uploadToS3 = this.uploadToS3.bind(this);
        this.panes = [<PersonalPane nextPane={this.applyPersonal} />,
             <AncestryPane nextPane={this.applyAncestry} />, 
             <BackgroundPane nextPane={this.applyBackground} />,
              <ClassPane nextPane={this.applyClass}/>, <FreebiePane nextPane={this.applyFreebies}/>, <ImagePane nextPane={this.applyImage}/>,
              <SavePane saveMeMaybe={this.saveMeMaybe} data={this.state}/>
            ];
    }

    /**
     * Applies data from the personal pane to the overall cumulative character stats
     */
    applyPersonal(personal){
        this.setState({
            pane: this.state.pane + 1,
            firstName: personal.firstName,
            lastName: personal.lastName,
            bio: personal.bio,
            age: personal.age,
            personalDone: true
        });
    }
 /**
     * Applies data from the ancestry pane to the overall cumulative character stats
     */
    applyAncestry(ancestry){
        this.setState({
            pane: this.state.pane + 1,
            strength: this.state.strength + ancestry.strength,
            dexterity: this.state.dexterity + ancestry.dexterity,
            constitution: this.state.constitution + ancestry.constitution,
            intelligence: this.state.intelligence + ancestry.intelligence,
            wisdom: this.state.wisdom + ancestry.wisdom,
            charisma: this.state.charisma + ancestry.charisma,
            ancestry: ancestry.selected,
            ancestryDone: true
        });
    }

     /**
     * Applies data from the background pane to the overall cumulative character stats
     */
    applyBackground(background){
        this.setState({
            pane: this.state.pane + 1,
            strength: this.state.strength + background.strength,
            dexterity: this.state.dexterity + background.dexterity,
            constitution: this.state.constitution + background.constitution,
            intelligence: this.state.intelligence + background.intelligence,
            wisdom: this.state.wisdom + background.wisdom,
            charisma: this.state.charisma + background.charisma,
            background: background.background,
            bgFreebA: background.firstFreeb,
            bgFreebB: background.secondFreeb,
            backgroundDone: true
        });
    }

     /**
     * Applies data from the class pane to the overall cumulative character stats
     */
    applyClass(classPojo){
           this.setState({
             class: classPojo.name,
             pane: this.state.pane + 1,
               strength: this.state.strength + classPojo.strength,
               dexterity: this.state.dexterity + classPojo.dexterity,
               constitution: this.state.constitution + classPojo.constitution,
               intelligence: this.state.intelligence + classPojo.intelligence,
               wisdom: this.state.wisdom + classPojo.wisdom,
               charisma: this.state.charisma + classPojo.charisma,
               class: classPojo.selected.name
           });
    }
     /**
     * Adds freebie points to the cumulative ability scores.
     */
    applyFreebies(freebies) {
        console.log(freebies);
        this.setState({
          strength: this.state.strength + freebies.strength,
          dexterity: this.state.dexterity + freebies.dexterity,
          constitution: this.state.constitution + freebies.constitution,
          intelligence: this.state.intelligence + freebies.intelligence,
          wisdom: this.state.wisdom + freebies.wisdom,
          charisma: this.state.charisma + freebies.charisma,
          pane: this.state.pane + 1,
          freebiesDone: true
        });
    }

    applyImage(imagePaneState) {
        this.setState({
            image: imagePaneState.image,
            pane: this.state.pane + 1
        })
    }

  formatFilename(filename) {
        const date = moment().format("MMDDYYYY");
        const rando = Math.random()
            .toString(36)
            .substring(2, 7);
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFileName = `images/${date}-${rando}-${cleanFileName}`
        return newFileName.substring(0, 60);
    }

    async uploadToS3(file, signedRequest) {
        const options = {
            headers: {
                "Content=Type": file.type
            }
        }
        await axios.put(signedRequest, file, options);
    }


    async save(event)  {
       event.preventDefault();
       const image = this.state.image;
       const response = await this.props.s3Sign({
           variables: {
               filename: this.formatFilename(image.name),
               filetype: image.type
           }
       });

       const { signedRequest, url } = response.data.signS3;
       await this.uploadToS3(image, signedRequest)

       // Add image: url to the key value pairs. This url will be what gets saved to the db
       this.props.mutate({
         variables: {
             userId: this.props.data.currentUser.id, 
             firstName: this.state.firstName,
             lastName: this.state.lastName,
             class: this.state.class,
             ancestry: this.state.ancestry,
             background: this.state.background.name,
             bio: this.state.bio,
             age: parseInt(this.state.age),
             statline: {
                 strength: this.state.strength,
                 dexterity: this.state.dexterity,
                 constitution: this.state.constitution,
                 intelligence: this.state.intelligence,
                 wisdom: this.state.wisdom,
                 charisma: this.state.charisma
             },
             level: 1
         },
         refetchQueries: [{ query, currentUser }]
       }).then( hashHistory.push('/'));
       //put catch down here later
    }

    saveMeMaybe(){
      
        if (this.state.freebiesDone) {
            return (
                <div>
                    <div className="stats-tally">
                        <h3 className="page-header">Ability Scores</h3>
                        <div className="stat-single">STR: {this.state.strength}</div>
                        <div className="stat-single">DEX: {this.state.dexterity} </div>
                        <div className="stat-single">CON: {this.state.constitution}</div>
                        <div className="stat-single">INT: {this.state.intelligence}</div>
                        <div className="stat-single">WIS: {this.state.wisdom}</div>
                        <div className="stat-single">CHA: {this.state.charisma}</div>
                    </div>
                    <div className="personal-tally">
                       <div className="be-capitalized">Name: {this.state.firstName} {this.state.lastName}</div>
                        <div className="be-capitalized">Ancestry: {this.state.ancestry}</div>
                        <div className="be-capitalized">Background: {this.state.background.name}</div>
                        <div className="be-capitalized">Class: {this.state.class}</div>
                        <div className="be-capitalized">Age: {this.state.age}</div>
                        <p>Bio: {this.state.bio}</p>
                    </div>

                    <button
                        className="char-submit" 
                        onClick={this.save}
                        value="Save Character"
                    >Save Character</button>

                </div>
          
            )
        }  else {
            return <div>
            </div>
        }
    }

    backgroundMaybe(){
        if (this.state.background) {
            // debugger;
            return (
         <div className="background-tally">
            <h3 className="page-header">Background</h3>
            <div>Background: <span className="be-capitalized"> {this.state.background.name}</span> </div>
            <p>{this.state.background.description}</p>
            <p>Working as a {this.state.background.name} shaped your very development, granting you a +2 to your {this.state.bgFreebA} and {this.state.bgFreebB} scores.</p>
        </div>  
            )
     
        } else {
            return <div>
                The function is not working
            </div>
        }
      
    }

  render() {
    return (
      <div className="char-creation-page">
        {this.panes[this.state.pane]}
    </div>
    )
  }
}

const mutation =  gql`
mutation AddCharacter($userId: ID, $firstName: String, $lastName: String, $class: String, $level: Int, $age: Int, $statline: StatLineInput!, $ancestry: String, $background: String, $bio: String, $image: String){
    addCharacter(userId: $userId, firstName: $firstName, lastName: $lastName, class: $class, level: $level, age: $age, statline: $statline, ancestry: $ancestry, background: $background, bio: $bio, image: $image)
    {
        id
        firstName
        lastName
        ancestry
        background
        class
        bio
        age
        image
       statline {
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
      }
    }
}`;

const s3Sign = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
        url
        signedRequest
    }
  }
`;


export default graphql(currentUser)(
    graphql(mutation)(CharCreate) 
  );


