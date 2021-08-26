import React,{useEffect} from 'react'
import {Provider} from 'react-redux'
import { store } from './CryeptoApp/redux/store'

import HomeScreen from './CryeptoApp/screens/HomeScreen'

const App = () => {

  return (
    <Provider store={store}>
      <HomeScreen/>
    </Provider>
  )
}

export default App
