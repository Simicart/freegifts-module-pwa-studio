import { useQuery } from '@apollo/client';
import { GET_FREE_GIFTS_BY_QUOTE_ITEM } from './FreeGifts.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useCartItemGift = props => {
    const { item, skipChecking } = props;
    let item_id;
    if (item && item.id)
        item_id = parseInt(item.id);
    const [{ cartId }] = useCartContext();

    const { data: giftRuleData } = useQuery(GET_FREE_GIFTS_BY_QUOTE_ITEM, {
        variables: {
            item_id,
            cartId
        },
        skip: !item_id || skipChecking || !cartId,
        fetchPolicy: 'cache-and-network'
    });

    return {
        giftRuleData
    }
}