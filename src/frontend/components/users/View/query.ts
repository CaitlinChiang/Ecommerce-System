import { gql } from '@apollo/client'

export const GetUser = gql`
  query ($_id: ID) {
    get_user(_id: $_id) {
      _id
      deliveryAddress {
        address
        cityId
      }
      email
      firstName
      lastName
      permissions
      phoneNumber
      type
    }
  }
`

export const GetUsers = gql`
  query ($active: Boolean, $paginateData: PaginateDataInput, $type: String) {
    get_users(active: $active, paginateData: $paginateData, type: $type) {
      _id
      active
      email
      firstName
      lastName
      permissions
      phoneNumber
      createdAt
      createdByEmail
      updatedAt
      updatedByEmail
    }

    get_users_count(active: $active, paginateData: $paginateData, type: $type)
  }
`
