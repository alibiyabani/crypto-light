import {getMarketData} from '../../services/cryptoService'

export const fetchAllMarketData = () => {
     return async(dispatch) => {
         try{
            const market = await getMarketData();
            const top50Result =  await top50(market);
            await dispatch({type:"INIT",payload:[top50Result,market]})
         }
         catch(error){
             console.log(error)
         } 
     }
}

export const top50 = async (market) =>{

    let totalMarketCapital = 0 
    let totalMarketValue = 0
    let top50Result

    market?.map((item)=>{totalMarketCapital+= item.market_cap})
    market?.map((item)=>{totalMarketValue+=  item.total_volume}) 
    top50Result =  {totalMarketCapital: totalMarketCapital,totalMarketValue: totalMarketValue}
    return top50Result;

}