import React from 'react';
import { useOptionContent } from '../../talons/useOptionContent'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const OptionContent = props => {
    const { giftItem, closeDialog, addGiftProduct } = props
    console.log(giftItem)
    const { productInfoData, productInfoError, productInfoLoading } = useOptionContent({ giftItem })
    if (productInfoLoading)
        return <LoadingIndicator />
    if (!productInfoData || productInfoError) {
        console.log(productInfoError)
        console.log(productInfoData)
        // addGiftProduct(giftItem);
        // closeDialog();
    }
    console.log(productInfoData)
    return (
        <div>
            
        </div>
    )
}

export default OptionContent