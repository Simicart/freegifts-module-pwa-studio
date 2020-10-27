import { useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_GIFT_PRODUCT, REMOVE_GIFT_PRODUCT } from './FreeGifts.gql'
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { GET_CART_DETAILS } from '@magento/venia-ui/lib/components/CartPage/cartPage.gql';

export const useAddGiftProducts = props => {
    const { rule } = props
    const [openDialog, setOpenDialog] = useState(false);
    let freeGiftLeft = rule.max_gift - rule.total_added;
    freeGiftLeft = freeGiftLeft > 0 ? freeGiftLeft : 0;
    const [{ cartId }] = useCartContext();

    const [
        addGiftProductMutation,
        { error: addGiftProductError, loading: addGiftProductLoading, data: addGiftProductData }
    ] = useMutation(ADD_GIFT_PRODUCT);

    const [
        removeGiftProductMutation,
        { error: removeGiftProductError, loading: removeGiftProductLoading, data: removeGiftProductData }
    ] = useMutation(REMOVE_GIFT_PRODUCT);

    let derivedErrorMessage;
    if (addGiftProductError || removeGiftProductError) {
        const errorTarget = addGiftProductError || removeGiftProductError;
        if (errorTarget.graphQLErrors) {
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            derivedErrorMessage = errorTarget.message;
        }
    }

    const [fetchCart] = useLazyQuery(GET_CART_DETAILS, {
        variables: {
            cartId
        },
        fetchPolicy: 'cache-and-network'
    });

    const addGiftProduct = useCallback((itemData) => {
        addGiftProductMutation({
            variables: {
                cartId,
                ruleId: rule.rule_id,
                giftId: itemData.id,
                configurableOptions: []
            }
        })
    }, [addGiftProductMutation])


    const removeGiftProduct = useCallback((itemData) => {
        removeGiftProductMutation({
            variables: {
                cartId,
                itemId: itemData.id
            }
        })
    }, [removeGiftProductMutation])

    useEffect(() => {
        //fetch cart after updated
        if ((removeGiftProductData || addGiftProductData) && !addGiftProductLoading && !removeGiftProductLoading) {
            fetchCart()
        }
    }, [removeGiftProductData, addGiftProductData, addGiftProductLoading, removeGiftProductLoading])

    return {
        openDialog,
        setOpenDialog,
        freeGiftLeft,
        giftItems: rule.gifts,
        addGiftProduct,
        derivedErrorMessage,
        addGiftProductLoading,
        removeGiftProduct,
        removeGiftProductLoading
    };
}