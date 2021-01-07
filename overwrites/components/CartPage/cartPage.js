import React from 'react';
import { useCartPage } from '../../../talons/useCartPage';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments';
import ProductListing from '@magento/venia-ui/lib/components/CartPage/ProductListing';
import PriceSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary';
import defaultClasses from '@magento/venia-ui/lib/components/CartPage/cartPage.css';
import { GET_CART_DETAILS } from '@magento/venia-ui/lib/components/CartPage/cartPage.gql';
import AddGiftProducts from '../../../components/addGiftProducts/index'

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 *
 * @see {@link https://venia.magento.com/cart}
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides for the component.
 * See [cartPage.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CartPage from "@magento/venia-ui/lib/components/CartPage";
 */
const CartPage = props => {
    const talonProps = useCartPage({
        queries: {
            getCartDetails: GET_CART_DETAILS
        }
    });

    const {
        cartItems,
        handleSignIn,
        hasItems,
        isSignedIn,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        cartData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    const signInDisplay = !isSignedIn ? (
        <LinkButton
            classes={{ root: classes.signInLink }}
            onClick={handleSignIn}
        >
            {'Sign In'}
        </LinkButton>
    ) : null;

    const productListing = hasItems ? (
        <ProductListing setIsCartUpdating={setIsCartUpdating} />
    ) : (
            <h3>There are no items in your cart.</h3>
        );

    const priceAdjustments = hasItems ? (
        <PriceAdjustments setIsCartUpdating={setIsCartUpdating} />
    ) : null;
    const priceSummary = hasItems ? (
        <PriceSummary isUpdating={isCartUpdating} />
    ) : null;

    let addFreeGiftBtn = ''
    if (cartData && cartData.cart && cartData.cart.mp_free_gifts && cartData.cart.mp_free_gifts.length &&
        cartData.cart.mp_free_gifts_button) {
        cartData.cart.mp_free_gifts.map(
            giftRule => {
                if (
                    !giftRule.auto_add && (giftRule.total_added < giftRule.max_gift) &&
                    !addFreeGiftBtn
                ) {
                    addFreeGiftBtn =
                        <div className={classes.free_gift_btn} style={{marginBottom: 15}}>
                            <AddGiftProducts rule={giftRule} classes={{}} btnSettings={cartData.cart.mp_free_gifts_button} />
                        </div>
                }
            }
        )
    }
    return (
        <div className={classes.root}>
            <Title>{`Cart - ${STORE_NAME}`}</Title>
            <div className={classes.heading_container}>
                <h1 className={classes.heading}>Cart</h1>
                {signInDisplay}
                <div className={classes.stockStatusMessageContainer}>
                    <StockStatusMessage cartItems={cartItems} />
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.items_container}>{productListing}</div>
                <div className={classes.price_adjustments_container}>
                    {addFreeGiftBtn}
                    {priceAdjustments}
                </div>
                <div className={classes.summary_container}>
                    <div className={classes.summary_contents}>
                        {priceSummary}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
