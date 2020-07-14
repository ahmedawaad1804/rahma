import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
/* colors */
import colors from '../../colors'
/* actions */
import { refreshtProducts, firstGetProducts, setCartModifications } from '../../actions/product'
import { getBestSeller } from '../../actions/bestSeller'
import { getCategory } from '../../actions/Category'
import { getAdress } from '../../actions/adressAction'
import store from '../../store'
import { connect } from 'react-redux'

import dataService from '../../services/dataService'
/* storage */
import { AsyncStorage } from 'react-native';
import { getToken } from '../../utility/storage'
class MainScreenLoading extends React.Component {

  async componentDidMount() {
    const loginStatus = await getToken();
    console.log(loginStatus);
    if(loginStatus){
      this.props.navigation.navigate("JBHome")
      
    }
    dataService.getProducts().then(response => {
      //save token and navigatexf
      // console.log(response.data.products);
      console.log(response.data.products);

      this.props.firstGetProducts(response.data.products)
      this.props.navigation.navigate("AuthStack")


    }
    ).catch(err => {
      console.log(err)

    }
    )
    this.props.getBestSeller()
    this.props.getCategory()
    this.props.getAdress()

    this.getCart()



  }
  async getCart() {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart != null) {
        this.props.setCartModifications(JSON.parse(cart))
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);

    }
  }

  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.mainImageView}>
          <Image source={require("../../assets/logo.png")}
            style={styles.mainImageStyle} />
        </View>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 60 / 812 }}></View>

        <ActivityIndicator size={70} color={colors.white} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight
  },
});
const mapDispatchToProps = {
  refreshtProducts,
  firstGetProducts,
  getBestSeller,
  getCategory,
  setCartModifications,
  getAdress
};
const mapStateToProps = state => ({
  productsReducer: state.productsReducer,
  cartReducer: state.cartReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreenLoading)

