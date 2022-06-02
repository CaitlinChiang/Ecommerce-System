import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_user(_id: $_id) {
      _id
    }

    get_users {
      _id
    }

    get_users_count
  }
`
