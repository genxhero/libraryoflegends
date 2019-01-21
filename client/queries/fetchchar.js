import gql from 'graphql-tag';

export default gql`
  query fetchCharById($id: String){
      character(id: $id){
          id
          firstName
          lastName
          class
          level
          ancestry
          bio
          statline {
              strength
              dexterity
              constitution
              intelligence
              wisdom
              charisma
          }
          user {
              id
              username
          }
      }
  }
`;
