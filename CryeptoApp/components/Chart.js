import React,{useEffect} from 'react'
import { View, Text, Image,StyleSheet,Platform,Dimensions } from 'react-native'
import {ChartDot, ChartPath, ChartPathProvider,ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

import { DarkColor } from '../assets/ThemeColor/darkTheme';

export const {width: SIZE} = Dimensions.get('window');

const Chart = ({curentPrice,logo,symbol,name,priceChanePercentage7d,sparkLine}) => {

    let modifyCurentPrice;
    const priceChangeColor = priceChanePercentage7d > 0 ? DarkColor.colors.positiveColor : DarkColor.colors.negativeColor;
    
    if(Platform.OS === 'ios') modifyCurentPrice = curentPrice.toLocaleString('en-US' ,{currency:'USD'})
    else modifyCurentPrice = curentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
    const sharedPriceChange = useSharedValue(modifyCurentPrice);

    useEffect(()=>{
        sharedPriceChange.value = modifyCurentPrice;
    },[curentPrice])

    const formatUSD = value => {
        'worklet';
        if (value === '') {return `$${sharedPriceChange.value}`}        
        const formatetValue = `$${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        return formatetValue;
      };  
    
    return (
        <View style={styles.container}>
            <ChartPathProvider data={{ points: sparkLine, smoothingStrategy: 'bezier' }}>
                <View style={styles.chartWrapper}>
                    <View style={styles.titleWrapper}>
                        <View style={styles.upperTitle}>
                            <View style={styles.upperTitleLeft}>
                                <Image style={styles.image} source={{uri:logo}}/>
                                <Text style={styles.subTitle}>{name} ({symbol.toUpperCase()})</Text>
                            </View>
                            <Text style={styles.subTitle}>7d</Text>
                        </View>
                        <View style={styles.lowerTitle}>
                            <ChartYLabel format={formatUSD} style={styles.leftTitle}/>
                            <Text style={[styles.rightTitle,{color:priceChangeColor}]}>{priceChanePercentage7d.toFixed(2)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chartLineWrapper}>
                    <ChartPath height={SIZE / 2} stroke={DarkColor.colors.chartColor} width={SIZE} />
                    <ChartDot style={{ backgroundColor: DarkColor.colors.dotColor }} />
                </View>
            </ChartPathProvider>
        </View>

    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:DarkColor.colors.forGround,
        flex:1
    },
    chartWrapper:{
        backgroundColor:DarkColor.colors.forGround,
        padding: 16,
        flex: 1,
    },
    upperTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    upperTitleLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        width:24,
        height:24
    },
    subTitle:{
        color: DarkColor.colors.textColor,
        marginLeft: 10,
    },
    lowerTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    },
    leftTitle:
    {
        color: DarkColor.colors.textColor,
        fontSize:22,
        fontWeight:'bold'
    },
    rightTitle:{
        fontSize:18,
        marginTop:5,
        backgroundColor:DarkColor.colors.forGround,

    },
})

export default Chart
