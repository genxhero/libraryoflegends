import React, { Component } from 'react'
import { graphql } from "react-apollo";
import query from "../queries/getuser";
import {hashHistory} from 'react-router';

class UserPage extends Component {

}

export default graphql(query)(UserPage);