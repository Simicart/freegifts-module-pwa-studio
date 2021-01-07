import { gql } from '@apollo/client';

import { GiftCardFragment } from '@magento/venia-ui/lib/components/CartPage/GiftCards/giftCardFragments';
import { ProductListingFragment } from '@magento/venia-ui/lib/components/CartPage/ProductListing/productListingFragments';
import { PriceSummaryFragment } from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummaryFragments';
import { AppliedCouponsFragment } from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCodeFragments';
import { RuleFragment } from '../../../talons/FreeGifts.gql'


export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        mp_free_gifts {
            ...RuleFragment
        }
        mp_free_gifts_button {
            is_show_button
            rule_id
            button_label
            button_color
            text_color
        }
        ...AppliedCouponsFragment
        ...GiftCardFragment
        ...ProductListingFragment
        ...PriceSummaryFragment
    }
    ${AppliedCouponsFragment}
    ${GiftCardFragment}
    ${ProductListingFragment}
    ${PriceSummaryFragment}
    ${RuleFragment}
`;

/*
export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        ...AppliedCouponsFragment
        ...GiftCardFragment
        ...ProductListingFragment
        ...PriceSummaryFragment
    }
    ${AppliedCouponsFragment}
    ${GiftCardFragment}
    ${ProductListingFragment}
    ${PriceSummaryFragment}
`;
*/
