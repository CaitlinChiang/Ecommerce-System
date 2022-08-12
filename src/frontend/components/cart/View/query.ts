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
          stockQuantity
        }
        productVariant {
          _id
          imageUrl
          name
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
