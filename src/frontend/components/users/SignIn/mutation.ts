import { gql } from '@apollo/client'

export default gql`
  mutation ($email: String!, $password: String!, $type: String!) {
    sign_in_user(email: $email, password: $password, type: $type)
  }
`
