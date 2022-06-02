import { gql } from '@apollo/client'

export default gql`
  mutation ($name: String!, $details: String) {
    create_payment_method(name: $name, details: $details) {
      _id
    }
  }
`
