import { gql } from '@apollo/client'

export const GetPaymentMethod = gql`
  query ($_id: ID!) {
    get_payment_method(_id: $_id) {
      _id
      name
      details
      createdAt
      createdByEmail
      updatedAt
      updatedByEmail
    }
  }
`

export const GetPaymentMethods = gql`
  query ($paginateData: PaginateDataInput) {
    get_payment_methods(paginateData: $paginateData) {
      _id
      name
      details
    }

    get_payment_methods_count(paginateData: $paginateData)
  }
`
