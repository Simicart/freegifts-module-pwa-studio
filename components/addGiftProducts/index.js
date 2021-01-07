import React, { useMemo, useEffect } from 'react';
import Button from '@magento/venia-ui/lib/components/Button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import { useAddGiftProducts } from '../../talons/useAddGiftProducts'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addGiftProducts.css'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useToasts } from '@magento/peregrine';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import OptionContent from './optionContent';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const AddGiftProducts = props => {
    const { btnSettings } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useAddGiftProducts({
        rule: props.rule
    })
    const {
        openDialog,
        setOpenDialog,
        freeGiftLeft,
        giftItems,
        addGiftProduct,
        derivedErrorMessage,
        addGiftProductLoading,
        removeGiftProduct,
        removeGiftProductLoading,
        showProductOptions,
        setShowProductOptions,
        itemToShowOption,
        setItemToShowOption,
        freegiftsConfigData
    } = talonProps;

    const toggleItem = (giftItem, toRemove) => {
        if (toRemove) {
            removeGiftProduct(giftItem)
        } else {
            //to add
            console.log(giftItem)
            if (giftItem.configurable) {
                setItemToShowOption(giftItem)
                setShowProductOptions(true);
            } else {
                addGiftProduct(giftItem);
            }
        }
    }

    const [, { addToast }] = useToasts();
    useEffect(() => {
        if (derivedErrorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: derivedErrorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, derivedErrorMessage]);

    const giftOptions = useMemo(() => {
        return giftItems.map(
            giftItem => {
                const { id, image, name, final_price, gift_price, added } = giftItem
                return (
                    <div className={classes.giftItemCtn} key={id}>
                        <div className={classes.giftItem} key={id}>
                            <img src={image} />
                            <div className={classes.giftItemName}>{name}</div>
                            <div className={classes.giftItemOldPrice}>{final_price}</div>
                            <div className={classes.giftItemNewPrice}>{gift_price}</div>
                            <Button onClick={() => {
                                //removing cause error on api, waiting for mp to fix
                                if (!added) {
                                    toggleItem(giftItem, added)
                                }
                            }} type={added ? 'reset' : 'button'} style={{opacity: added ? 0.5 : 1}}>
                                {added ? 'Added' : 'Add'}
                            </Button>
                        </div>
                    </div>
                )
            }
        )
    }, [giftItems])
console.log(itemToShowOption)
    return (
        <div className={classes.addGiftProductsCtn}>
            <Button onClick={() => setOpenDialog(!openDialog)}
                style={
                    {
                        border: 'none',
                        backgroundColor: (btnSettings && btnSettings.button_color) ?
                            btnSettings.button_color :
                            (freegiftsConfigData && freegiftsConfigData.mpFreeGiftsConfigs.design.background_color) ?
                                freegiftsConfigData.mpFreeGiftsConfigs.design.background_color :
                                'blue',
                        color: (btnSettings && btnSettings.text_color) ?
                            btnSettings.text_color :
                            (freegiftsConfigData && freegiftsConfigData.mpFreeGiftsConfigs.design.text_color) ?
                                freegiftsConfigData.mpFreeGiftsConfigs.design.text_color :
                                'white',
                    }
                }>
                {(btnSettings && btnSettings.button_label) ?
                    btnSettings.button_label :
                    (freegiftsConfigData && freegiftsConfigData.mpFreeGiftsConfigs.design.label) ?
                        freegiftsConfigData.mpFreeGiftsConfigs.design.label :
                        'Add Free Gift'}
            </Button>
            <Dialog
                isOpen={openDialog}
                title={'Select Free Gifts'}
                classes={classes}
                onCancel={() => setOpenDialog(false)}
            >
                {
                    (addGiftProductLoading || removeGiftProductLoading) ?
                        <LoadingIndicator>
                            {addGiftProductLoading ? 'Adding Gift' : 'Removing Gift'}
                        </LoadingIndicator> :
                        <React.Fragment>
                            <div className={classes.freeGiftLeftLabel}>
                                {`${freeGiftLeft} Free Gift(s) Left`}
                            </div>
                            {giftOptions}
                        </React.Fragment>
                }
            </Dialog>
            {
                itemToShowOption ?
                    <Dialog
                        isOpen={showProductOptions}
                        title={'Select Gift Options'}
                        classes={classes}
                        onCancel={() => setShowProductOptions(false)}
                    >
                        <OptionContent giftItem={itemToShowOption}
                            closeDialog={() => setShowProductOptions(false)}
                            addGiftProduct={addGiftProduct}
                            classes={classes}
                        />
                    </Dialog> : ''
            }
        </div>
    )
}

export default AddGiftProducts