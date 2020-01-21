import gql from 'graphql-tag';

const toggleCool = gql`mutation toggleCool($id: String!){
    toggleCool(id: $id){
        username
        cool
    }
}`;

export default toggleCool;