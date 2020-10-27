import { useQuery } from '@apollo/client';
import { GET_PRODUCT_OPTION } from './ProductOptions.gql'

export const useOptionContent = props => {
    const { giftItem } = props
    const queryData = useQuery(
        GET_PRODUCT_OPTION,
        {
            variables: {
                sku: "VT11"
            },
            skip: (!giftItem || !giftItem.id)
        }
    )
    const {
        data: productInfoData,
        loading: productInfoLoading,
        error: productInfoError
    } = queryData;
    console.log(queryData);
    console.log(productInfoData);
    return {
        productInfoError,
        productInfoLoading,
        productInfoData
    }
}