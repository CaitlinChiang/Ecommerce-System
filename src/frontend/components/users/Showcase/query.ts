import gql from 'graphql-tag'

export default gql`
  query(
    $_id: ID!
  ) {
    get_user(
      _id: $_id
    ) {
      _id
    }

    get_users {
      _id
    }

    get_users_count
  }
`
