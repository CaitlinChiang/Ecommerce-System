import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $type: String) {
    get_user(_id: $_id) {
      _id
    }

    get_users(type: $type) {
      _id
    }

    get_users_count(type: $type)
  }
`
