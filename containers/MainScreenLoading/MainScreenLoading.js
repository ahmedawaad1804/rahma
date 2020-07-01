import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
/* colors */
import colors from '../../colors'

import { refreshtProducts,firstGetProducts } from '../../actions/product'
import store from '../../store'
import { connect } from 'react-redux'

import dataService from '../../services/dataService'

class MainScreenLoading extends React.Component {

  componentDidMount() {

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
  firstGetProducts
 };
 const mapStateToProps = state => ({
  productsReducer:state.productsReducer
})
export default connect(mapStateToProps,mapDispatchToProps)(MainScreenLoading)

