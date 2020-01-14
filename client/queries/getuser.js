import gql from 'graphql-tag';

export default gql`
  query user($username: String){
      user(username: $username){
        id
        username
        bio
        cool
        characters {
            id
            firstName
            lastName
            class
            level
            image
        }
      }
  }
`;