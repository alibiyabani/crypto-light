import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet ,Image,Platform} from 'react-native'

import { DarkColor } from '../assets/ThemeColor/darkTheme';

const ListItem = ({name,symbol,logo,curentPrice,PriceChanePercentage7d,onPress}) => {

    let modifyCurentPrice;
    const priceChangeColor = PriceChanePercentage7d > 0 ? DarkColor.colors.positiveColor : DarkColor.colors.negativeColor;

    if(Platform.OS === 'ios') modifyCurentPrice = curentPrice?.toLocaleString('en-US' ,{currency:'USD'})
    else modifyCurentPrice = curentPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {styles.itemWraper}>

                <View style = {styles.leftContent}>
                    <Image style ={styles.image} source = {{uri:logo}}/>
                    <View style = {styles.titleWraper}>
                        <Text style={styles.title}>{name || "-"}</Text>
                        <Text style={styles.subTitle}>{symbol?.toUpperCase()}</Text>
                    </View>
                </View>

                <View style = {styles.rightContent}>
                    <Text style={styles.title}>${modifyCurentPrice || "-"}</Text>
                    <Text style={[styles.subTitle],{color:priceChangeColor,marginTop:4}}>{PriceChanePercentage7d?.toFixed(2)}%</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    itemWraper:{
        backgroundColor : DarkColor.colors.forGround,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',       
        padding: 10,
        marginTop: 5,
        marginBottom:5,
        borderRadius: 8
    },
    image:{
        width:48,
        height:48,
    },
    leftContent:{
        flexDirection:'row',
        alignItems:'center'

    },
    titleWraper:{
        marginLeft: 15,
    },
    title:{
        color:DarkColor.colors.textColor,
        fontSize:18
    },
    subTitle:{
        color:DarkColor.colors.textColor,
        opacity:.5,
        fontSize:14,
        marginTop:4

    },
    rightContent:{
        alignItems:'flex-end'
    },
})

export default ListItem
