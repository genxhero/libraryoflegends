import gql from 'graphql-tag';

const toggleCool = gql`mutation toggleCool($id: String!){
    toggleCool(id: $id){
        user
    }
}`;

export default toggleCool;