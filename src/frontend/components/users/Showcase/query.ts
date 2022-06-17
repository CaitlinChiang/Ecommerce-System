import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $paginateData: PaginateDataInput, $type: String) {
    get_user(_id: $_id) {
      _id
    }

    get_users(paginateData: $paginateData, type: $type) {
      _id
      email
      firstName
      lastName
      phoneNumber
      createdAt
    }

    get_users_count(paginateData: $paginateData, type: $type)
  }
`
