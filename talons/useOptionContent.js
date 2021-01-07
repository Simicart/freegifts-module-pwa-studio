import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_OPTION } from './ProductOptions.gql'

export const useOptionContent = props => {
    const { giftItem, closeDialog, addGiftProduct } = props;
    const [selectedOption, setSelectedOption] = useState({});
    const queryData = useQuery(
        GET_PRODUCT_OPTION,
        {
            variables: {
                sku: giftItem.sku
            },
            skip: (!giftItem || !giftItem.id)
        }
    )
    const {
        data: productInfoData,
        loading: productInfoLoading,
        error: productInfoError
    } = queryData;

    let configurable_options;
    if (!productInfoData || productInfoError || !productInfoData.productDetail
        || !productInfoData.productDetail.items || !productInfoData.productDetail.items.length
        || !productInfoData.productDetail.items[0] || !productInfoData.productDetail.items[0].configurable_options
        || !productInfoData.productDetail.items[0].configurable_options.length
    ) {
        addGiftProduct(giftItem);
        closeDialog();
    } else {
        configurable_options = productInfoData.productDetail.items[0].configurable_options;
    }

    const handleSelectionChange = (attribute_id, selection) => {
        var newSelectedOption = Object.assign({}, selectedOption);
        newSelectedOption[attribute_id] = selection;
        setSelectedOption(newSelectedOption);
    }
    let canAddProduct;
    if (configurable_options && (configurable_options.length === Object.keys(selectedOption).length))
        canAddProduct = true;

    const handleAddCart = () => {
        const keys = Object.keys(selectedOption);
        const confOptionToAdd = [];
        keys.map(
            key => {
                confOptionToAdd.push(
                    {
                        option_id: key,
                        option_value: selectedOption[key]
                    }
                )
            }
        );
        addGiftProduct(giftItem, confOptionToAdd);
        closeDialog();
    }

    return {
        productInfoError,
        productInfoLoading,
        productInfoData,
        configurable_options,
        handleSelectionChange,
        canAddProduct,
        handleAddCart
    }
}