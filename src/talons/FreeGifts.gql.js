import gql from 'graphql-tag';

export const RuleFragment = gql`
    fragment RuleFragment on Rule {
        rule_id
        auto_add
        max_gift
        gifts {
            id
            name
            gift_price
            free_ship
            added
            configurable
            required_option
            final_price
            image
        }
        notice
        total_added
    }
`

export const GET_FREE_GIFTS_BY_PRODUCT_SKU = gql`
    query mpFreeGiftsByProductSku (
        $sku : String!
    ) {
        mpFreeGiftsByProductSku (
            sku : $sku
        ) {
            ...RuleFragment
        }
    }
    ${RuleFragment}
`;

export const GET_FREE_GIFTS_BY_QUOTE_ITEM = gql`
    query mpFreeGiftsByQuoteItem (
        $item_id : Int!
    ) {
        mpFreeGiftsByQuoteItem (
            item_id : $item_id
        ) {
            ...RuleFragment
        }
    }
    ${RuleFragment}
`;