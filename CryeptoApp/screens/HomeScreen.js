import React , {useMemo, useRef, useState, useEffect} from 'react';
import { FlatList, StyleSheet,BackHandler, Image, View, SafeAreaView,ActivityIndicator, TouchableOpacity,Alert,Dimensions } from 'react-native';
import {BottomSheetModal,BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import NetInfo from '@react-native-community/netinfo';
import { Header} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import {AdMobBanner} from 'expo-ads-admob';

import {useDispatch} from "react-redux"
import { fetchAllMarketData } from '../redux/actions';
import{useSelector} from 'react-redux'

import { DarkColor } from '../assets/ThemeColor/darkTheme';
import ListItem from '../components/ListItem';
import Chart from '../components/Chart';
import MarketDetails from '../components/MarketDetails';


export const {width: SCREEN} = Dimensions.get('window');

export default function HomeScreen() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.markerReducer)

  const[selectedCoin,setSelectedCoin] = useState(null)
  const[adMobState,setAdmobeState] = useState(true)
  const[spinner,setSpinner] = useState(true)

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const fetchMarketData = async () => {
    dispatch(fetchAllMarketData());
  }

  const checkNet = async () => {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected
  }


  useEffect(()=>{
    const internetConnected = checkNet();
    fetchMarketData();

    if(data.length == 2 || internetConnected)
    {
      setSpinner(false)
    }   
    if(!internetConnected) {
      Alert.alert(
        'Something is wrong',
        'Check Your Internet Connection',
        [
          { text: 'OK', onPress: BackHandler.exitApp }
        ],
        { cancelable: false }
      );
    }
 
  },[])

  const reloudData = () =>{
    const internetConnected = checkNet();
    fetchMarketData();       
    if(data.length == 2)
    {
      setSpinner(false)
    }   
    if(!internetConnected && internetConnected) {
      Alert.alert(
        'Something is wrong',
        'Check Your Internet Connection',
        [
          { text: 'OK', onPress: BackHandler.exitApp }
        ],
        { cancelable: false }
      );
    }
  }

  const ListHedaer = () =>(
    <>
    {data.length == 2 &&
      <View style={styles.marketDetails}>
          <MarketDetails totalMarketCapital={data[0]?.totalMarketCapital} totalMarketValue={data[0]?.totalMarketValue} />
      </View>
    }
    </>
  )

  const openModal = (item) => {
    setSelectedCoin(item);
    bottomSheetModalRef.current.present();
  }

  const hideAdmobe = () => {
    setAdmobeState(false)
  }

  const LeftComponent = (
    <>
      <Image style={styles.logo} source={require('../assets/cryptoTitleLogo.png')} />
    </>
  )


  return (
    <>
      <Header
        containerStyle={{
          justifyContent: 'space-around',
          height:60,
          alignItems:'center',
          marginTop:15
        }}
        backgroundColor={DarkColor.colors.forGround}
        placement="left"
        rightComponent={<TouchableOpacity onPress={reloudData}><View style={styles.icon}><Icon name='refresh' type='Material' color='#808080' iconStyle={{width:20,marginRight:15,marginTop:4}}/></View></TouchableOpacity>}
        centerComponent={LeftComponent}
        /> 
      <BottomSheetModalProvider>

        <SafeAreaView style={styles.container}>
        {spinner && 
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color= {DarkColor.colors.textColor} /> 
          </View>
         }
         {!spinner &&
          <FlatList
              keyExtractor = {(item) => item.id}
              data = {data[1]}
              renderItem = {({item})=>(
                <ListItem
                  name={item.name}
                  symbol={item.symbol} 
                  logo={item.image} 
                  curentPrice={item.current_price} 
                  PriceChanePercentage7d={item.price_change_percentage_7d_in_currency}
                  onPress = {() => openModal(item)}
                />
              )}
            ListHeaderComponent = {!spinner && <ListHedaer/>}
          />}
        </SafeAreaView> 
        {adMobState &&
          <View style={styles.adMob}>
            <AdMobBanner
                bannerSize="BANNER"
                adUnitID="ca-app-pub-7078093402554807/8892242806" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={hideAdmobe}
              />
          </View>
        }
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheetWrapper}
          >
            {selectedCoin&&
              <Chart
                curentPrice = {selectedCoin.current_price}
                logo = {selectedCoin.image}
                name = {selectedCoin.name}
                symbol = {selectedCoin.symbol}
                priceChanePercentage7d = {selectedCoin.price_change_percentage_7d_in_currency}
                sparkLine = {selectedCoin.sparkline_in_7d.price}
              />
            }
          </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({
  adMob:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:DarkColor.colors.backGround

  },
  activityIndicator:{
    flex:1,
    backgroundColor:DarkColor.colors.backGround,
    alignItems:'center',
    justifyContent:'center',
  },
  bottomSheetWrapper:{
    shadowColor:'#ffffff',
    shadowOffset:{width:0,height:-4},
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: DarkColor.colors.backGround,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: DarkColor.colors.forGround,
  },
  titleWraper:{
    marginTop:40,
    paddingHorizontal: 10,
  },
  marketTitle: {
    fontSize:24,
    fontWeight:'bold',
    fontFamily:'Roboto',
    color: DarkColor.colors.textColor
  },
  marketDetails:{
    backgroundColor: DarkColor.colors.forGround,
    height:148,
    borderRadius:8,
    marginTop:10,
    marginBottom:5
  },
  icon:{
    paddingRight:5
  },
  logo:{
    width:100,
    height:23,
    marginTop:5,
  }

});
