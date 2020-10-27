import { useQuery } from '@apollo/client';
import { GET_FREE_GIFTS_BY_QUOTE_ITEM } from './FreeGifts.gql';

export const useCartItemGift = props => {
    const { item, skipChecking } = props;
    let item_id;
    if (item && item.id)
        item_id = parseInt(item.id);
    const {
        data: giftRuleData
    } = useQuery(GET_FREE_GIFTS_BY_QUOTE_ITEM, {
        variables: {
            item_id
        },
        fetchPolicy: 'no-cache',
        skip: (!item_id || skipChecking)
    });

    return {
        giftRuleData
    }
}