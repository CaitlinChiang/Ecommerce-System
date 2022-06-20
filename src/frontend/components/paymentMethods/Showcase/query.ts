import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_payment_method(_id: $_id) {
      _id
    }
  }
`

export const queryMultiple = gql`
  query (paginateData: PaginateDataInput) {
    get_payment_methods(paginateData: $paginateData) {
      _id
    }

    get_payment_methods_count(paginateData: $paginateData)
  }
`
