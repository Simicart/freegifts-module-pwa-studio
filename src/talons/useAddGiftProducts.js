import { useState } from 'react';

export const useAddGiftProducts = props => {
    console.log(props)
    const { rule } = props
    const [openDialog, setOpenDialog] = useState(false);
    let freeGiftLeft = rule.max_gift - rule.total_added;
    freeGiftLeft = freeGiftLeft > 0 ? freeGiftLeft : 0;
    
    return {
        openDialog,
        setOpenDialog,
        freeGiftLeft,
        giftItems : rule.gifts
    };
}