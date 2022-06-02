import { gql } from '@apollo/client'

export default gql`
  mutation ($email: String!, $password: String!) {
    sign_in_user(email: $id, password: $password) {
      _id
    }
  }
`
