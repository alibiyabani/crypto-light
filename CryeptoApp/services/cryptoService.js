import axios from 'axios';
import moment from 'moment';


const formatSparkLine = (numbers) => {

    const sevenDaysAgo = moment().subtract(7,'days').unix();
    let formatedSparkLine = numbers.map((item,index) => {

        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item,
        }        
    })
    return formatedSparkLine;
}

const formatedMarketData = (data) => {

    let formatData = [];

    data.forEach(item => {
        const sparklineData = formatSparkLine(item.sparkline_in_7d.price)
        const formatedItem ={
            ...item,
            sparkline_in_7d:{
                price: sparklineData
            }
        }
        formatData.push(formatedItem)
    });

    return formatData
}


export const getMarketData = async () =>{
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d"
    try{
        const responce = await axios.get(url);
        const data = responce.data;
        const status = responce.status;

        const formatedData = formatedMarketData(data);
        return formatedData;
    }
    catch(error){
        //console.log("sample Data")
        //let totalMarketCapital = 0 
        // let totalMarketValue = 0 
        // const formatedData = formatedMarketData(SAMPLE_DATA);
        // SAMPLE_DATA.map((item)=>{totalMarketCapital+= item.market_cap})
        // SAMPLE_DATA.map((item)=>{totalMarketValue+= item.total_volume})
        // const top50Result = {totalMarketCapital: totalMarketCapital,totalMarketValue: totalMarketValue}

        // const addedData = {
        //     formatedData:formatedData,
        //     top50Result:top50Result
        // }
        // return formatedData;
    }
}
