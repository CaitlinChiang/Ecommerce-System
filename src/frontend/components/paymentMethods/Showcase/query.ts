import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_payment_method(_id: $_id) {
      _id
    }

    get_payment_methods {
      _id
    }

    get_payment_methods_count
  }
`
