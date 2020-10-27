import React, { useMemo } from 'react';
import Button from '@magento/venia-ui/lib/components/Button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import { useAddGiftProducts } from '../../talons/useAddGiftProducts'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addGiftProducts.css'

const AddGiftProducts = props => {
    console.log(props)
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        openDialog,
        setOpenDialog,
        freeGiftLeft,
        giftItems
    } = useAddGiftProducts({
        rule: props.rule
    })
    const toggleItem = giftItem => {
        console.log(giftItem)
    }
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
                            <Button onClick={() => toggleItem(giftItem)} type={added ? 'reset' : 'button'}>
                                {added ? 'Remove' : 'Add'}
                            </Button>
                        </div>
                    </div>
                )
            }
        )
    }, [giftItems])
    return (
        <div className={classes.addGiftProductsCtn}>
            <Button onClick={() => setOpenDialog(!openDialog)} >
                {'Add Free Gift'}
            </Button>
            <Dialog
                isOpen={openDialog}
                title={'Select Free Gifts'}
                classes={classes}
                onCancel={() => setOpenDialog(false)}
            >
                <div className={classes.freeGiftLeftLabel}>
                    {`${freeGiftLeft} Free Gift(s) Left`}
                </div>
                {giftOptions}
            </Dialog>
        </div>
    )
}

export default AddGiftProducts