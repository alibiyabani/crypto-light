import React,{useState} from 'react'
import { View, Text, StyleSheet,Platform } from 'react-native'

import {DarkColor} from '../assets/ThemeColor/darkTheme'


const MarketDetails = ({totalMarketCapital,totalMarketValue}) => {
    
    const [marketdata,setMarketData] = useState(0);

        // useEffect(()=>{

        //     try{
        //         const fetchMarketDeatail = async () =>{
        //                 const marketValuEstate = await getMarketDetails();
        //                 setMarketData(marketValuEstate)
        //             }
        //             fetchMarketDeatail();
        //         }
        //     catch(error) {console.log(error)}
            
        // },[])
    // const marketStateColor = marketdata > 0 ? DarkColor.colors.positiveColor : DarkColor.colors.negativeColor;

    const converttoShortFormat = (labelValue) => {

        return Math.abs(Number(labelValue)) >= 1.0e+12
    
        ? (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(2) + " T "
        : Math.abs(Number(labelValue)) >= 1.0e+9
        
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B "
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M "
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K "   
        : Math.abs(Number(labelValue));    
    }


    return (
        <View style={styles.marketDetailsWrapper}>
            <View style={styles.upper}>
                <View style={styles.firstline}>
                    <Text style={styles.title}>${converttoShortFormat(totalMarketCapital)}</Text>
                    {/* <View style={[styles.bolet,{backgroundColor:marketStateColor}]}/> */}
                </View>
                <Text style={styles.subTitle}>Top 50 Market Capitalization</Text>
            </View>
            <View style={styles.lower}>
                <View style={styles.firstline}>
                    <Text style={styles.title}>${converttoShortFormat(totalMarketValue)}</Text>
                    {/* <View style={[styles.bolet,{backgroundColor:marketStateColor}]}/> */}
                </View>
                <Text style={styles.subTitle}>Top 50 Trading Volume 24h</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create ({
    marketDetailsWrapper:{
        flexDirection:'column',
        justifyContent:'space-around'
    },
    upper:{
        backgroundColor:DarkColor.colors.backGround,
        paddingHorizontal:10,
        paddingVertical:5,
        marginHorizontal:8,
        marginTop:8,
        borderRadius:8
    },
    lower:{
        backgroundColor:DarkColor.colors.backGround,
        paddingHorizontal:10,
        paddingVertical:5,
        marginHorizontal:8,
        marginTop:8,
        borderRadius:8
    },
    title:{
        fontSize:18,
        color:DarkColor.colors.textColor

    },
    subTitle:{
        fontSize:14,
        color:DarkColor.colors.textColor,
        marginTop:4,
    
    },
    firstline:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    bolet:{
        borderRadius:50,
        width:15,
        height:15,
        
    }
    
})


export default MarketDetails

