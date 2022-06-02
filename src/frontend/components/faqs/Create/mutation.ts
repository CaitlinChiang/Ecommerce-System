import { gql } from '@apollo/client'

export default gql`
  mutation ($answer: String!, $question: String!) {
    create_faq(answer: $answer, question: $question) {
      _id
    }
  }
`
