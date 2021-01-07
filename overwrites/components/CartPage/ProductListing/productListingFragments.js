import { gql } from '@apollo/client';

export const ProductListingFragment = gql`
    fragment ProductListingFragment on Cart {
        id
        items {
            id
            mp_free_gifts {
                is_free_gift
                rule_id
                free_gift_message
                allow_notice
            }
            product {
                id
                name
                sku
                url_key
                url_suffix
                thumbnail {
                    url
                }
                small_image {
                    url
                }
                stock_status
            }
            prices {
                price {
                    currency
                    value
                }
            }
            quantity
            ... on ConfigurableCartItem {
                configurable_options {
                    id
                    option_label
                    value_id
                    value_label
                }
            }
        }
    }
`;
