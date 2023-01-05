import { gql } from '@apollo/client'

export const GetCart = gql`
  query {
    get_cart {
      _id
      items {
        product {
          _id
          imageUrl
          name
          price
          stockQuantity
        }
        productVariant {
          _id
          imageUrl
          name
          price
          stockQuantity
        }
        quantity
        totalPrice
      }
      quantity
      totalPrice
    }
  }
`
