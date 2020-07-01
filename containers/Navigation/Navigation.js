import React from 'react';
import { Image,Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import MainScreenLoading from '../MainScreenLoading/MainScreenLoading'
import InitialLoading from '../InitialLoading/InitialLoading'
import Login from '../Login/Login'
import Selection from '../Selection/Selection'
import Forgot from '../Forgot/Forgot'
import NewPass from '../NewPass/NewPass'
import Register from '../Register/Register'
import Verification from '../Verification/Verification'
import Home from '../Home/Home'
import JBHome from '../JBHome/JBHome'
import productInfo from '../ProductInfo/ProductInfo'
import MainCategory from '../MainCategory/MainCategory'
import Orders from '../Orders/Orders'
import Favorites from '../Favorites/Favorites'
import SearchResults from "../SearchResults/SearchResults"
import Cart from "../Cart/Cart"
import { createAppContainer } from "react-navigation";
/* colors */
import colors from '../../colors'
// HomeStack
const HomeStack = createStackNavigator({
   Home,
   MainCategory,
   SearchResults,
})
// main tab navigator 
const MainTabNavigator = createBottomTabNavigator({

    Home: {
        screen: HomeStack, navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/home-outline.png') : require('../../assets/tabIcons/home-outline.png')
                return <Image source={iconSrc} style={{ height: (57/3), width: (61/3) }} />;
            },
        },
    },
    Orders: {
        screen: Orders, navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/delivery.png') : require('../../assets/tabIcons/delivery-outline.png')
                return <Image source={iconSrc} style={{ height: 58/2.6, width: 74/2.6 }} />;
            },
        },
    },
    Favorites: {
        screen: Favorites, navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/favorite-outline.png') : require('../../assets/tabIcons/favorite-outline.png')
                return <Image source={iconSrc} style={{ height: 54/3, width: 62/3 }} />;
            },
        },
    },
    Profile: {
        screen: Home, navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/profile.png') : require('../../assets/tabIcons/profile-outline.png')
                return <Image source={iconSrc} style={{ height: 55/2.7, width: 50/2.7 }} />;
            },
        },
    },
}, {

    tabBarOptions: {
        activeTintColor: colors.black,
        inactiveTintColor: '#ccc',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#fff',
        labelStyle: {
            fontSize: 12,
            fontFamily: 'Cairo-Bold',
        },
        style: {
            height: Dimensions.get('window').height * 56 / 812,
        },

    }
})
const MainStack = createStackNavigator({
    MainTabNavigator: { screen: MainTabNavigator, navigationOptions: { header: null } },
    productInfo,
   Cart

    
})
const AuthStack = createStackNavigator({
    Login,
    Selection,
    Forgot,
    NewPass,
    Register,
    Verification
})
const switchNavigator = createSwitchNavigator(
    {
        // InitialLoading,
        MainScreenLoading,
        AuthStack,
        MainStack,
        JBHome
       
    }
)


// const AppContainer = createAppContainer(switchNavigator);
export default switchNavigator