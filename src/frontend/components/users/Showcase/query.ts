import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID) {
    get_user(_id: $_id) {
      _id
      deliveryAddress
      email
      firstName
      lastName
      phoneNumber
    }
  }
`

export const queryMultiple = gql`
  query ($active: Boolean, $paginateData: PaginateDataInput, $type: String) {
    get_users(active: $active, paginateData: $paginateData, type: $type) {
      _id
      active
      email
      firstName
      lastName
      phoneNumber
      createdAt
    }

    get_users_count(active: $active, paginateData: $paginateData, type: $type)
  }
`
