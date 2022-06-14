import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $paginateData: PaginateDataInput) {
    get_payment_method(_id: $_id) {
      _id
    }

    get_payment_methods(paginateData: $paginateData) {
      _id
    }

    get_payment_methods_count(paginateData: $paginateData)
  }
`
