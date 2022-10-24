import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $answer: String!, $question: String!) {
    update_faq(_id: $_id, answer: $answer, question: $question) {
      _id
      answer
      question
      createdAt
      createdByEmail
      updatedAt
      updatedByEmail
    }
  }
`
