import { gql } from '@apollo/client'

export default gql`
  query (
    $_id: ID
    $active: Boolean
    $paginateData: PaginateDataInput
    $type: String
  ) {
    get_user(_id: $_id) {
      _id
    }

    get_users(active: $active, paginateData: $paginateData, type: $type) {
      _id
      active
      firstName
      lastName
      email
      phoneNumber
      createdAt
    }

    get_users_count(active: $active, paginateData: $paginateData, type: $type)
  }
`
