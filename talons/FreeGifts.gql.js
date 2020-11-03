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

// export const GET_FREE_GIFTS_BY_PRODUCT_SKU = gql`
//     query mpFreeGiftsByProductSku (
//         $sku : String!
//     ) {
//         mpFreeGiftsByProductSku (
//             sku : $sku
//         ) {
//             ...RuleFragment
//         }
//         cart {
//             total_quantity
//         }
//     }
//     ${RuleFragment}
// `;

//add cart quantity to fetch it again when another item is updated
export const GET_FREE_GIFTS_BY_QUOTE_ITEM = gql`
    query mpFreeGiftsByQuoteItem (
        $item_id : Int!,
        $cartId: String!
    ) {
        mpFreeGiftsByQuoteItem (
            item_id : $item_id
        ) {
            ...RuleFragment
        }
        cart(
            cart_id: $cartId
        ) {
            total_quantity
        }
    }
    ${RuleFragment}
`;

export const ADD_GIFT_PRODUCT = gql`
    mutation mpFreeGiftsAddGift($cartId: String!, $ruleId: Int!, $giftId: Int!, $configurableOptions: [ConfigurableOptions]) {
        mpFreeGiftsAddGift(
            input: {
                cart_id: $cartId
                rule_id: $ruleId
                gift_id: $giftId
                configurable_options: $configurableOptions
            }
        ) @connection(key: "mpFreeGiftsAddGift") {
            status
            message
            rule_id
            quote_id
            quote_item_id
            product_gift_id
        }
    }
`;

export const REMOVE_GIFT_PRODUCT = gql`
    mutation mpFreeGiftsDeleteByQuoteItem($cartId: String!, $itemId: Int!) {
        mpFreeGiftsDeleteByQuoteItem(
            cart_id: $cartId
            item_id: $itemId
        ) @connection(key: "mpFreeGiftsAddGift")
    }
`;