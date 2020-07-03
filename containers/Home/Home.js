import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, SectionList, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* padding */
import Padv from '../../components/ViewPad/PadV'
/* component */
import Product from '../../components/Product/Product'
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
/* action */
import { refreshtProducts, firstGetProducts, setCart } from '../../actions/product'
/* services */
import dataService from '../../services/dataService'
/* adv */
import Adv from '../../components/Ads/Ads'
/* main category item */
// import MainCategory from '../../components/MainCategory/MainCategory'
import MainCategoryItem from '../../components/MainCategoryItem/MainCategoryItem'

/* toast */
import Toast from 'react-native-simple-toast';
/* pagination */
import Carousel from 'react-native-snap-carousel';




class Home extends React.Component {



  static navigationOptions = { header: null }



  state = {
    temprender: null,
    dataSource: {},
    borderRadius: 40,
    refreshing: false,
    data: [
      { key: 'Supermarket' },
      { key: 'Pastry' },
      { key: 'Mini Market' },
      { key: 'Beauty' },
      { key: 'f' },
      { key: 'a' },
      { key: '4' },
      { key: 'q' },
      { key: '5' },
      { key: 'w' },
      { key: '88' },


    ],
    categoryFalg: false,
    bestSeller: [],
    bestSellerProducts: [],
    isDataLoaded: false,
    test: null,
    count: 0,
    searchWord: "",
    _isSearch: false,
    searchData: [],
    index: 0

  };


  componentDidMount() {
    // console.log(this.state);
    store.subscribe(() => {
      this.setState({ count: this.props.cartReducer.length })

      // Some DOM api calls.
    });

    this.setState({ bestSellerProducts: this.props.bestsellerReducer }, (() => { this.setState({ isDataLoaded: true }) }))

    // console.log(this.props.categoryReducer);
    let temp = []
    this.props.categoryReducer.map(category => temp.push(category.mainCategory))
    this.setState({ data: temp })
  }


  onRefresh = () => {
    console.log("onRefresh");
    this.setState({ refreshing: true })
    this.props.refreshtProducts()
    this.setState({ refreshing: false })
    this.setState({ bestSellerProducts: this.props.bestsellerReducer })

  }
  //   getEvent(event) {
  //     console.log(event.nativeEvent.contentOffset.y);
  // if(event.nativeEvent.contentOffset.y>30){this.setState({borderRadius:0})}
  // if(event.nativeEvent.contentOffset.y<20){this.setState({borderRadius:40})}
  //   }
  navigateMainCategory(title, props) {
    // console.log("pressed");

    this.props.navigation.navigate("MainCategory", { title, props })

  }

  handlePress(item) {
    this.props.navigation.navigate("productInfo", { item: item })

  }
  handleCartAddOne(item) {
    this.props.setCart({
      item: item, count: 1,
    })
    Toast.show(`${item.productNameEN} added to cart`);

  }
  handleLike(bool, item) {
    console.log(bool);

    console.log("liked");
    console.log(item.id);


  }
  _handleSearchButton() {
    if (this.state.searchData.length == 0) {
      Toast.show("No Search input");
    } else {
      this.props.navigation.navigate("SearchResults", { items: this.state.searchData })

    }


  }
  _handleSearch = (text) => {

    let temp = []

    let i = 0;
    if (text != "") {
      dataService.search(text).then(response => {
        this.setState({ searchData: response.data }, () => {
          this.setState({ _isSearch: true })

        })
      }
      ).catch(err => {
        console.log(err);
      })


    }
    else {
      this.setState({ _isSearch: false })
      this.setState({ searchData: [] })
    }


  }



  _render = ({ item }) =>

    (
      (item.mainCategory == this.props.navigation.state.params.title) &&
      (this.state.searchWord == "" || item.productNameEN.includes(this.state.searchWord) || item.productNameAR.includes(this.state.searchWord)) &&
      // <Text>sd</Text>
      <Product handlePress={() => this.handlePress(item)}
        src={item}
      />

    )
  _headerItem = ({ }) => (
    <View style={{ alignItems: 'center' }}>


      <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 15 / 812 }}></View>
      <View style={styles.textView}>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          data={this.state.data}
          renderItem={() => <Adv />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 343 / 375}
          onSnapToItem={(index) => { this.setState({ index }); }}
          autoplay={true}
          autoplayInterval={4000}
        // loop={true}
        />
        <Text style={styles.titleText}>Discover</Text>
      </View>
      <View style={styles.horizontalScrollController}>

        {/* onPress={() => this.navigateMainCategory(`${this.props.categoryReducer[index].mainCategory}`, { item: this.props.categoryReducer[index] })} */}
        <FlatList
          data={this.props.categoryReducer}
          style={styles.horizontalScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            index % 2 == 0 &&
            <View >
              <MainCategoryItem
                click={() => this.navigateMainCategory(`${this.props.categoryReducer[index].mainCategory}`, { item: this.props.categoryReducer[index] })}
                src={this.props.categoryReducer[index]} />
              {this.props.categoryReducer[index + 1] &&
                <MainCategoryItem
                  click={() => this.navigateMainCategory(`${this.props.categoryReducer[index + 1].mainCategory}`, { item: this.props.categoryReducer[index + 1] })}

                  src={this.props.categoryReducer[index + 1]} />}
            </View>


          )}
        />




      </View>
      {/* <View style={styles.textView}>
        <Text style={styles.titleText}>BEST SELLERS</Text>
      </View> */}
    </View>
  )
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.mainImageView}>
          <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 1 / 2 - (Dimensions.get('window').width * 62 / 375) / 2 }}></View>
          <Image source={require("../../assets/logo-bg.png")}
            style={styles.mainImageStyle} />
          {/* <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 90 / 400 }}></View> */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: Dimensions.get('window').width * 18 / 375 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { this.props.navigation.navigate("Cart") }}>
                <Image source={require("../../assets/icons/cart.png")}
                  style={styles.cartImageStyle} />
                {this.state.count > 0 ? (<Badge
                  value={this.state.count}
                  status="error"
                  badgeStyle={{ backgroundColor: colors.badge }}
                  containerStyle={{ position: 'relative', top: 10, right: 10 }}
                  textStyle={{ fontFamily: 'Cairo-Bold', fontSize: 12 }}
                />) : null}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state._isSearch && <View style={styles.searchEnhancer}>
          <FlatList
            key={item => { item.id }}
            data={this.state.searchData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.searchItem} onPress={() => this.handlePress(item)}>
                <Text style={styles.searchItemFont}>{item.productNameEN}</Text>
              </TouchableOpacity>)}
          ></FlatList>
        </View>}
        <View style={styles.yellowContainer}>

          <View style={styles.textInputViewSearch}>
            <TextInput
              style={styles.textInputStyle}
              value={this.state.password}
              placeholder="What are you looking for?"
              placeholderTextColor={'#ccc'}
              width={Dimensions.get('window').width * 3 / 5}

              secureTextEntry={this.state.showPass}
              autoCapitalize='none'
              onChangeText={(text) => this._handleSearch(text)}
            />
          </View>
          <View style={styles.searchView}>
            <TouchableOpacity style={styles.searchView} onPress={() => this._handleSearchButton()}>
              <Image source={require("../../assets/icons/search.png")}
                style={styles.imageStyleSearch} />
            </TouchableOpacity>
          </View>


        </View>

        <View style={[styles.mainContainer, { borderTopLeftRadius: this.state.borderRadius, borderTopRightRadius: this.state.borderRadius, paddingTop: 30 }]}>
          {(this.state.isDataLoaded) &&
            (<View style={styles.MainScrollView}

            >


              <View style={{ alignItems: 'center' }}>


                <SectionList
                  ListHeaderComponent={this._headerItem}

                  // key={item => { item.id }}
                  // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.grid}
                  sections={[{ title: "BEST SELLER", data: this.state.bestSellerProducts },
                  { title: "LATEST OFFER", data: this.state.bestSellerProducts }]}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.textView}>
                      <Text style={styles.titleText}>{title}</Text>
                    </View>
                  )}
                  initialNumToRender={5}
                  renderItem={({ item, index }) =>

                    index % 2 == 0 &&
                    <View style={{ flexDirection: 'row' }}>
                      <Product
                        handlePress={() => this.handlePress(this.state.bestSellerProducts[index])}
                        handleLike={(e) => { this.handleLike(e, this.state.bestSellerProducts[index]) }}
                        handleCartAddOne={() => this.handleCartAddOne(this.state.bestSellerProducts[index])}
                        src={this.state.bestSellerProducts[index]}
                      />
                      {this.state.bestSellerProducts[index + 1] &&
                        <Product
                          handlePress={() => this.handlePress(this.state.bestSellerProducts[index + 1])}
                          handleLike={(e) => { this.handleLike(e, this.state.bestSellerProducts[index + 1]) }}
                          handleCartAddOne={() => this.handleCartAddOne(this.state.bestSellerProducts[index + 1])}
                          src={this.state.bestSellerProducts[index + 1]}
                        />}
                    </View>


                    // <Product
                    //   handlePress={() => this.handlePress(item)}
                    //   handleLike={(e) => { this.handleLike(e, item) }}
                    //   handleCartAddOne={() => this.handleCartAddOne(item)}
                    //   src={item}
                    // />

                  }
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                  }
                  style={{ width: '100%' }}
                  keyExtractor={(item, index) => index}
                  horizontal={false}
                // numColumns={2}
                >
                  {/* <RefreshControl  refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} /> */}

                </SectionList>



              </View>
            </View>)}
          {(!this.state.isDataLoaded) && (<ActivityIndicator size={70} color={colors.primary} />)}

        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  smallText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14
  },
  mainContainer: {
    width: '100%',
    flex: 1,
    // height: Dimensions.get('window').height * (812 - 180) / 812,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  yellowUpperOnly: {
    marginTop: 150
  }
  ,
  yellowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDFDDD',
    borderRadius: 35,
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  iconView: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF064',
    width: Dimensions.get('window').width * 54 / 375,
    height: Dimensions.get('window').height * 46 / 812,

  },
  tOpacity: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 10,
    height: 10,
    padding: 10
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10
  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textBelow: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    padding: 15
  },
  titleText: {
    marginLeft: Dimensions.get('window').width * 15 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 20
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 100,
    marginRight: 100,

  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  mainImageView: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 20

  },
  mainImageStyle: {
    width: Dimensions.get('window').width * 62 / 375,
    height: Dimensions.get('window').width * 62 / 375,
    resizeMode: "contain"
  },
  cartImageStyle: {
    width: 37,
    height: 39,
    resizeMode: "contain"
  },

  imageThumbnail: {

    height: 50,
    width: 50,
  },
  gridCell: {
    width: Dimensions.get('window').width * 106 * .95 / 375,
    height: Dimensions.get('window').height * 95 * .95 / 812,
    borderRadius: 15,
    margin: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 2,
  },
  gridRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  }
  , horizontalScroll: {
    // backgroundColor: 'red',
  },
  horizontalScrollController: {
    height: Dimensions.get('window').height * 95 * 2.3 * .95 / 812,
    marginLeft: 10
  },
  yellowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDFDDD',
    borderRadius: 35,
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 5 / 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 5,
    marginBottom: 20,

  },
  imageStyleSearch: {
    // width: 50,
    height: "50%",
    resizeMode: "contain"
  },
  textInputStyle: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14
  },
  textInputViewSearch: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // width: Dimensions.get('window').width * (343 - 110) / 375,
    // height: Dimensions.get('window').height * 46 / 812,
  },
  searchView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  },
  searchEnhancer: {
    width: Dimensions.get('window').width * 343 / 375,
    // height: Dimensions.get('window').height * 30 / 100,
    backgroundColor: colors.fade,
    position: 'absolute',
    zIndex: 50,
    top: Dimensions.get('window').height * 18 / 100,
    borderRadius: 15,
    maxHeight: 230
  },
  searchItemFont: {
    fontSize: 13,
    fontFamily: "Cairo-SemiBold",
    margin: 15
  },
  searchItem: {
    borderBottomWidth: .5,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  }
});
const mapStateToProps = state => ({
  // productsReducer: state.productsReducer,
  cartReducer: state.cartReducer,
  bestsellerReducer: state.bestsellerReducer,
  categoryReducer: state.categoryReducer,

})
const mapDispatchToProps = {
  // refreshtProducts,
  // firstGetProducts,
  setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)