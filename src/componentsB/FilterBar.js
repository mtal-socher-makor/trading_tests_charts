import{useState} from 'react'
import { Grid, Typography } from '@material-ui/core'
import SelectInput from '@material-ui/core/Select/SelectInput'

const orderTypsArr = [{name: "FOK", value: "FOK"}, {name: "MKT", value: "MKT"}, {name: "RFQ", value: "RFQ"}]
const sidesArr = [{name: "BUY", value: "BUY"}, {name: "SELL", value: "SELL"}]

// const productValues = [...new Set(data.data.map(item => item.name))]
const productValues = ['BTC-EUR_1', 'BTC-USD_2', 'LTC-USD_5', 'ETH-EUR_7', 'ETH-USD_8', 'XRP-USD_11', 'BCH-USD_14', 'BTC-GBP_16', 'EOS-USD_22', 'BTC-USDT_25', 'USDT-USD_26', 'BTC-USDC_29', 'ETH-USDT_39', 'ADA-USD_60', 'BAT-USD_69', 'YFI-USD_90', 'SUSHI-USD_91', 'MATIC-USD_92', 'AAVE-USD_93', 'LINK-USD_94', 'ENJ-USD_101', 'CRV-USD_102', 'MANA-USD_103', 'COMP-USD_109', 'UNI-USD_110', 'ALGO-USD_115', 'SOL-USD_119', 'AXS-USD_121', 'MKR-USD_122']
const productNames = ['BTC-EUR', 'BTC-USD', 'LTC-USD', 'ETH-EUR', 'ETH-USD', 'XRP-USD', 'BCH-USD', 'BTC-GBP', 'EOS-USD', 'BTC-USDT', 'USDT-USD', 'BTC-USDC', 'ETH-USDT', 'ADA-USD', 'BAT-USD', 'YFI-USD', 'SUSHI-USD', 'MATIC-USD', 'AAVE-USD', 'LINK-USD', 'ENJ-USD', 'CRV-USD', 'MANA-USD', 'COMP-USD', 'UNI-USD', 'ALGO-USD', 'SOL-USD', 'AXS-USD', 'MKR-USD']
//const productNames = productValues.map(item => item.replace(/_[0-9]*/, ""))
const productsArr = productValues.map((item, index) => ({name: productNames[index], value: item}))

function FilterBar({data}) {

    const [product, setProduct] = useState({})
    const [orderType, setOrderType] = useState({})
    const [side, setSide] = useState({})


 
    return (
        <Grid container >
            {/* <SelectInput 
                name="product"
                label="Product"
                value={product}
                onChange={e => setProduct(e)}
                optionsArray={productsArr}
                optionLabelField="name"
                valueField="value"
            />  */}
        </Grid>
    )
}

export default FilterBar