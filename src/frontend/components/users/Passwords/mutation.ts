import { gql } from '@apollo/client'

export const ForgotUserPassword = gql`
  mutation ($email: String!) {
    forgot_user_password(email: $email)
  }
`

export const ResetUserPassword = gql`
  mutation (
    $email: String!
    $newPassword: String!
    $oldPassword: String
    $verificationCode: String
  ) {
    reset_user_password(
      email: $email
      newPassword: $newPassword
      oldPassword: $oldPassword
      verificationCode: $verificationCode
    ) {
      _id
    }
  }
`
