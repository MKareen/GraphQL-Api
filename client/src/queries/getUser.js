import gql from 'graphql-tag';

export default gql`
  query UserQuery($_id: ID!) {
    user(_id: $_id) {
      _id
      fullName
      email
      createdAt
      updatedAt
    }
  }
`;
