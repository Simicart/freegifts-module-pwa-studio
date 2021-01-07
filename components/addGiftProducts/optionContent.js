import React from 'react';
import { useOptionContent } from '../../talons/useOptionContent'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Options from '@magento/venia-ui/lib/components/ProductOptions';
import Button from '@magento/venia-ui/lib/components/Button';

const OptionContent = props => {
    const { giftItem, closeDialog, addGiftProduct, classes } = props
    const { productInfoLoading, handleSelectionChange, configurable_options, canAddProduct, handleAddCart } = useOptionContent({ giftItem, closeDialog, addGiftProduct })
    if (productInfoLoading)
        return <LoadingIndicator />
console.log('11');
    return (
        <div className={classes.giftProductConfigurableOptionCtn}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={configurable_options}
            />
            {
                canAddProduct ?
                    <Button onClick={() => handleAddCart()} type="button">
                        {'Add Gift'}
                    </Button> :
                    ''
            }
        </div>
    )
}

export default OptionContent