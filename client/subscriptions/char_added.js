import gql from 'graphql-tag';

const charAdded = gql`
subscription charAdded { 
    char {
      firstName
      lastName
      class
      level
      ancestry
    }
  }
`;

export default charAdded;