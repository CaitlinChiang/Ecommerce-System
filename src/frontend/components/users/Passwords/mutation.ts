import { gql } from '@apollo/client'

export const ForgotUserPassword = gql`
  mutation ($email: String!, $type: String!) {
    forgot_user_password(email: $email, type: $type)
  }
`

export const ResetUserPasswordEmail = gql`
  mutation ($email: String!, $newPassword: String!, $verificationCode: String!) {
    reset_user_password_email(
      email: $email
      newPassword: $newPassword
      verificationCode: $verificationCode
    ) {
      _id
    }
  }
`

export const ResetUserPasswordProfile = gql`
  mutation ($email: String!, $newPassword: String!, $oldPassword: String!) {
    reset_user_password_profile(
      email: $email
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      _id
    }
  }
`
