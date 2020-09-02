import React from 'react';
import { StyleSheet, Text, View, RefreshControl, SectionList, FlatList, ActivityIndicator, Button, Animated,I18nManager, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCart } from '../../actions/product'
import { Header } from 'react-navigation';
/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import Product from '../../components/Product/Product'
import CategoryItem from '../../components/CategoryItem/CategoryItem'
class MainCategory extends React.Component {
    state = {
        counter: this.props.cartReducer.length,

        categoryName: "",
        searchWord: "",
        categoryArr: [],
        bestSellerProducts: []

    };


    static navigationOptions = { header: null }
    handlePress(item) {
        this.props.navigation.navigate("productInfo", { item: item, counter: this.state.counter })

    }
    handleCartAddOne(item) {
        this.props.setCart({
            item: item, count: 1,
        })
        // Toast.show(`${item.productNameEN} added to cart`);

    }
    handleLike(bool, item) {
        console.log(bool);

        console.log("liked");
        console.log(item.id);


    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ counter: this.props.cartReducer.length })

        });
        // console.log(this.props.navigation.state.params.props.item.nameEN);
        // console.log(this.props.navigation.state.params.props);
        
        this.setState({ bestSellerProducts: this.props.bestsellerReducer }, (() => { this.setState({ isDataLoaded: true }) }))
        this.setState({ categoryArr: this.props.navigation.state.params.props.item.Catygory }, (() => { this.setState({ isDataLoaded: true })  }))

console.log(this.props.navigation.state.params.props.item.nameEN);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    increase = () => {
        this.setState({ count: ++this.state.count })
    }
    decrease = () => {
        if (this.state.count > 0) {
            this.setState({ count: --this.state.count })
        }
    }
    submitItem = () => {
        this.props.setCart({ itemID: this.props.navigation.state.params.item.id, count: this.state.count })
        if (this.state.count > 0) {
            // Toast.show(`${this.props.navigation.state.params.item.productNameEN} added to cart`);
        }

    }
    _handlePassword = (text) => {
        this.setState({ searchWord: text })
        console.log(this.state.searchWord);

    }
    navigateSubCategory(item,mainCategory) {
      this.props.navigation.navigate("SubCategory", { items: item,mainCategory:mainCategory })

           
            
    }
    _subCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.gridCell}>
            <Image style={styles.imageThumbnail, { width: 108 / 3, height: 109 / 3 }} source={require("../../assets/categories/beauty.png")} />
            <Text style={styles.smallText}>Beauty</Text>
            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 12 / 812 }}></View>
        </TouchableOpacity>
    )
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image
                                source={require('../../assets/icons/back.png')}
                                style={{
                                    width: Dimensions.get('window').width * 10 * 1.2 / 375,
                                    height: Dimensions.get('window').height * 18 * 1.2 / 812,


                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>{I18nManager.isRTL ? this.props.navigation.state.params.props.item.nameAR:this.props.navigation.state.params.props.item.nameEN}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}
                            onPress={() => { this.props.navigation.navigate("Cart") }}>
                            <Image source={require("../../assets/icons/cart.png")}
                                style={styles.cartImageStyle} />
                            {this.state.counter > 0 ? (<Badge
                                value={this.state.counter}
                                status="error"
                                badgeStyle={{ backgroundColor: colors.badge }}
                                containerStyle={{ position: 'relative', top: 10, right: 10 }}
                                textStyle={{ fontFamily: 'Cairo-Bold', fontSize: 12 }}
                            />) : null}
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.yellowContainer}>

                    <View style={styles.textInputViewSearch}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.password}
                            placeholder="Search products,.."
                            placeholderTextColor={'#ccc'}
                            width={Dimensions.get('window').width * 3 / 5}

                            secureTextEntry={this.state.showPass}
                            autoCapitalize='none'
                            onChangeText={(text) => this._handlePassword(text)}
                        />
                    </View>
                    <View style={styles.searchView}>
                        <Image source={require("../../assets/icons/search.png")}
                            style={styles.imageStyleSearch} />
                    </View>

                </View>

                {this.state.searchWord == "" && (
                    <View style={styles.mainContainer}>

                        <View style={{ alignItems: 'center' }}>

                            <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 15 / 812 }}></View>

                            <SectionList
                                ListHeaderComponent={this._headerItem}

                                // key={item => { item.id }}
                                // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.grid}
                                sections={[
                                    { title: I18nManager.isRTL ? "إكتشف" : "DISCOVER", data: this.state.categoryArr },
                                    { title: I18nManager.isRTL ? "الاحدث" : "NEWEST ARRIVAL", data: this.state.bestSellerProducts },]}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View style={styles.textView}>
                                        <Text style={styles.titleText}>{title}</Text>
                                    </View>
                                )}
                                initialNumToRender={30}
                                renderItem={({ item, index }) =>
                                    !item.icon ?
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
                                        :
                                        index % 3 == 0 &&
                                        <View style={{ flexDirection: 'row' }}>

                                            <CategoryItem
                                                click={() => this.navigateSubCategory(this.state.categoryArr[index],this.props.navigation.state.params.props.item.nameEN)}
                                                src={this.state.categoryArr[index]}
                                            />
                                            {this.state.categoryArr[index + 1] &&
                                                <CategoryItem
                                                    click={() => this.navigateSubCategory(this.state.categoryArr[index+1],this.props.navigation.state.params.props.item.nameEN)}
                                                    src={this.state.categoryArr[index+1]}
                                                />}
                                            {this.state.categoryArr[index + 2] &&
                                                <CategoryItem
                                                    click={() => this.navigateSubCategory(this.state.categoryArr[index+2],this.props.navigation.state.params.props.item.nameEN)}
                                                    src={this.state.categoryArr[index+2]}
                                                />
                                            }
                                        </View>

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



                    </View>

                )}

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
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        flex: 1,
        // height: '84%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // padding: 20,
        paddingBottom: 0

    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',

        padding: 0
    },
    discountBadge: {
        backgroundColor: colors.red,
        width: "17%",
        height: "4%",
        position: 'absolute',
        right: 20,
        top: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeBadge: {
        width: "17%",
        height: "4%",
        position: 'absolute',
        left: 20,
        top: 20,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    discountText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        color: colors.white
    },

    heartImage: {
        resizeMode: "contain",
        height: "100%"

    },
    productImage: {
        // width: Dimensions.get('window').width * 9 / 20,
        width: Dimensions.get('window').width * 190 / 375,
        height: Dimensions.get('window').height * 245 / 812,
        // height: '30.1%',
        resizeMode: "contain",
        marginTop: 20
    },
    rateButton: {
        width: Dimensions.get('window').width * 117 / 375,
        height: Dimensions.get('window').height * 29 / 812,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height * 30 / 812,
        borderRadius: 15
    },
    rateFont: {
        fontSize: 14,
        fontFamily: "Cairo-Regular"
    },
    productQntyContainer: {
        // height: Dimensions.get('window').height * 80 / 812,
        width: Dimensions.get('window').width,
        marginTop: Dimensions.get('window').height * 30 / 812,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    productTitle: {
        flex: 1,
    }
    , productQnty: {
        flex: 1,
        alignItems: 'center',

    },
    priceContainer: {
        flexDirection: 'row',

    },
    dicountContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'
    },
    increamentContainer: {
        flexDirection: 'row',
        flex: 1,
        width: "100%",
        justifyContent: 'center'
    },
    plusOrMinus: {
        justifyContent: 'center',
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 7

    },
    plusMinusIcon: {
        resizeMode: "contain",
        height: 15,
        width: 10

    }, required: {
        justifyContent: 'center',
        width: "40%",
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: colors.fade,

        borderRadius: 7
    },
    addToCart: {
        height: Dimensions.get('window').height * 58 / 812,
        width: Dimensions.get('window').width,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    productDetails: {
        backgroundColor: colors.fade,
        flex: 1,
        width: Dimensions.get('window').width,
    },
    productDetailsTitle: {

        paddingLeft: Dimensions.get('window').width * 16 / 375,
        paddingTop: Dimensions.get('window').height * 19 / 812,
    },
    flatListContainer: {
        marginHorizontal: Dimensions.get('window').width * 48 / 375,
        flex: 1,
    },
    cartIcon: {
        resizeMode: "contain",
        width: 25,
        marginLeft: 10

    },
    discount: {
        fontFamily: 'Cairo-Regular',
        fontSize: 12,
        textDecorationLine: 'line-through',
        textDecorationStyle: "solid",
        textDecorationColor: "red",
        marginRight: 30
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 10 / 100,
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
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
    horizontalScrollController: {
        height: Dimensions.get('window').height * 95 * 2.3 / 812,
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

});
const mapStateToProps = state => ({
    cartReducer: state.cartReducer,
    bestsellerReducer: state.bestsellerReducer,
})
const mapDispatchToProps = {
    setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainCategory)