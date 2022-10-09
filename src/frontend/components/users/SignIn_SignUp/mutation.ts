import { gql } from '@apollo/client'

export const SignInMutation = gql`
  mutation ($email: String!, $password: String!, $type: String!) {
    sign_in_user(email: $email, password: $password, type: $type)
  }
`

export const SignUpMutation = gql`
  mutation (
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $type: String!
  ) {
    create_user(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
      type: $type
    )
  }
`
