import gql from 'graphql-tag';

export default gql`
  query user($username: String){
      user(username: $username){
        id
        username
        characters {
            id
            firstName
            lastName
            class
            level
        }
      }
  }
`;