import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $status: String!) {
    update_order(_id: $_id, status: $status) {
      _id
      deliveryAddress {
        address
        city {
          name
        }
      }
      items {
        product {
          name
        }
        productVariant {
          name
        }
        quantity
        totalPrice
      }
      payment {
        amountDue
        paymentMethod {
          name
        }
        shippingFee
        status
      }
      status
      user {
        email
        firstName
        lastName
        phoneNumber
      }
      createdAt
      updatedAt
    }
  }
`
