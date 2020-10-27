import gql from 'graphql-tag';

export const GET_PRODUCT_OPTION = gql`
query productDetail($sku: String) {
    productDetail: products(filter: {sku: {eq: $sku}}) {
      items {
        id
        sku
        url_key
        stock_status
    }
  }
}
`