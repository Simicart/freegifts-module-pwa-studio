import React from 'react';
import { useCartItemGift } from '../../../../talons/useCartItemGift'
import classes from './cartItemGift.css'
import AddGiftProducts from '../../../../components/addGiftProducts/index'

const CartItemGift = props => {
    const { item } = props;
    //price is zero, temp not checking
    let skipChecking = false
    try {
        if (!item.prices.price.value)
            skipChecking = true
    } catch (err) {
        skipChecking = true
    }
    const { giftRuleData } = useCartItemGift({
        item,
        skipChecking
    });

    if (!giftRuleData || !giftRuleData.mpFreeGiftsByQuoteItem || !giftRuleData.mpFreeGiftsByQuoteItem.length)
        return ''
    let ruleToDisplay
    giftRuleData.mpFreeGiftsByQuoteItem.every(
        ruleItem => {
            if (!ruleItem.auto_add) {
                ruleToDisplay = ruleItem
                return true
            }
        }
    )
    if (!ruleToDisplay)
        return ''
    return (
        <div className={classes.cartItemGiftCtn}>
            <AddGiftProducts rule={ruleToDisplay} classes={classes} />
        </div>
    )
}

export default CartItemGift