import { gql } from '@apollo/client'

export default gql`
  query {
    get_cart {
      _id
      items {
        product {
          imageUrl
          name
        }
        productVariant {
          imageUrl
          name
        }
        quantity
        totalPrice
      }
      quantity
      totalPrice
    }
  }
`
