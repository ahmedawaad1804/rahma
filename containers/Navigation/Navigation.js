import React from 'react';
import { Image, Dimensions,I18nManager } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import MainScreenLoading from '../MainScreenLoading/MainScreenLoading'
import InitialLoading from '../InitialLoading/InitialLoading'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Selection from '../Selection/Selection'
import Forgot from '../Forgot/Forgot'
import NewPass from '../NewPass/NewPass'
import Register from '../Register/Register'
import Verification from '../Verification/Verification'
import VerificationReset from '../VerificationReset/VerificationReset'
import Home from '../Home/Home'
import About from '../About/About'
import JBHome from '../JBHome/JBHome'
import productInfo from '../ProductInfo/ProductInfo'
import MainCategory from '../MainCategory/MainCategory'
import Adress from '../Adress/Adress'
import AddAdress from '../AddAdress/AddAdress'
import SubCategory from '../SubCategory/SubCategory'
import VerifyFBSignUp from '../VerifyFBSignUp/VerifyFBSignUp'
import Orders from '../Orders/Orders'
import Favorites from '../Favorites/Favorites'
import SearchResults from "../SearchResults/SearchResults"
import Cart from "../Cart/Cart"
import Setting from "../Setting/Setting"
import CartProgress from '../CartProgress/CartProgress'
import PaymentOnline from "../PaymentOnline/PaymentOnline"
import Payment from "../Payment/Payment"
/* trans */
import i18n from 'i18n-js';

i18n.translations = {
  en: require('../../utilities/en.json'),
  ar: require('../../utilities/ar.json'),
};

import { createAppContainer } from "react-navigation";
/* colors */
import colors from '../../colors'
// HomeStack
const HomeStack = createStackNavigator({
    Home,
    MainCategory,
    SearchResults,
    SubCategory
})
// main tab navigator 
const MainTabNavigator = createBottomTabNavigator({
    // {i18n.t('whatareulooking')}
    Homes: {
        screen: HomeStack, navigationOptions: {
            title:I18nManager.isRTL?"الرئيسية":"Home",
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/home.png') : require('../../assets/tabIcons/home-outline.png')
                return <Image source={iconSrc} style={{ height: Dimensions.get('window').height * 20 / 812, resizeMode: 'contain' }} />;
            },
        },
    },
    Orders: {
        screen: Orders, navigationOptions: {
            title:I18nManager.isRTL?"الطلبات":"Orders",
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/delivery.png') : require('../../assets/tabIcons/delivery-outline.png')
                return <Image source={iconSrc} style={{ height: Dimensions.get('window').height * 20 / 812, resizeMode: 'contain' }} />;
            },
        },
    },
    Favorites: {
        screen: Favorites, navigationOptions: {
            title:I18nManager.isRTL?"المفضلة":"Favorites",
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/favorite-outline.png') : require('../../assets/tabIcons/favorite-outline.png')
                return <Image source={iconSrc} style={{ height: Dimensions.get('window').height * 20 / 812, resizeMode: 'contain' }} />;
            },
        },
    },
    Profile: {
        screen: Profile, navigationOptions: {
            title:I18nManager.isRTL?"الملف":"Profile",
            showIcon: true,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconSrc = focused ? require('../../assets/tabIcons/profile.png') : require('../../assets/tabIcons/profile-outline.png')
                return <Image source={iconSrc} style={{ height: Dimensions.get('window').height * 20 / 812, resizeMode: 'contain' }} />;
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
    Cart,
    Adress,
    AddAdress,
    CartProgress,
    Payment,
    PaymentOnline,
    About,
    Setting


})
const AuthStack = createStackNavigator({
    Login,
    Selection,
    Forgot,
    NewPass,
    Register,
    Verification,
    VerificationReset,
    VerifyFBSignUp
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