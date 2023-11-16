import { gql } from "@apollo/client";

export const GET_BEVS = gql`
    query Beverages {
        beverages {
            id
            name
            price
            imgUrl
        }
    }
`

export const GET_BEV_BY_ID = gql`
    query Beverage($beverageId: ID!) {
    beverage(id: $beverageId) {
      id
      name
      price
      description
      imgUrl
      AuthorId
      Ingredients {
        name
      }
      Category {
        name
      }
      User {
        email
      }
    }
  }
`