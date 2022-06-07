import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, _paymentId: ID!) {
    delete_order(_id: $_id, _paymentId: $_paymentId) {
      _id
    }
  }
`
