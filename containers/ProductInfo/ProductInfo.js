import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
class ProductInfo extends React.Component {
    state = {
        count: 0,
        counter: this.props.cartReducer.length,
        itemNumber: 0,
        data: [
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad", "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",
            "ahmed awaad",


        ],

    };


    static navigationOptions = { header: null }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ counter: this.props.cartReducer.length })

        });
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
        
        if (this.state.count > 0) {
            // Toast.show(`${this.props.navigation.state.params.item.productNameEN} added to cart`);
            this.props.setCart({
                item:this.props.navigation.state.params.item, count: this.state.count,
            })
        }
        else{
            // Toast.show("Add Quantity");
        }

    }
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
                        }}>Product Info</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>
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

                <View style={styles.mainContainer}>
                    {/* <View style={[styles.detailsContainer, { backgroundColor: 'green' }]}> */}

                    {(this.props.navigation.state.params.item.discount && !(this.props.navigation.state.params.item.discount === "0")) && <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{this.props.navigation.state.params.item.discount}</Text>
                    </View>}

                    <View style={styles.likeBadge}>
                        <Image source={require("../../assets/icons/heart.png")}
                            style={styles.heartImage} />
                        <Text>3,547</Text>
                    </View>
                    <Image source={{ uri: this.props.navigation.state.params.item.uri }}
                        style={styles.productImage} />
                    <TouchableOpacity style={styles.rateButton}>
                        <Text style={styles.rateFont}>Rate Product</Text>
                    </TouchableOpacity>
                    <View style={styles.productQntyContainer}>
                        <View style={styles.productTitle}>
                            <Text style={{ fontFamily: "Cairo-Regular", fontSize: 20 }}>{this.props.navigation.state.params.item.productNameEN}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={{ fontFamily: "Cairo-Bold", fontSize: 18, color: colors.gold }}>EGP {this.props.navigation.state.params.item.price}</Text>
                                <View style={styles.dicountContainer}>
                                    <Text style={styles.discount}>{this.props.navigation.state.params.item.discountPrice}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.productQnty}>

                            <Text style={{ fontFamily: "Cairo-Regular", fontSize: 14 }}>Quantity</Text>
                            <View style={{ flexDirection: 'row', width: "100%", flex: 1, justifyContent: 'center' }}>
                                <View style={styles.increamentContainer}>
                                    <TouchableOpacity style={styles.plusOrMinus} onPress={this.decrease}>
                                        <Image source={require("../../assets/icons/minus.png")}
                                            style={styles.plusMinusIcon} />
                                    </TouchableOpacity>
                                    <View style={styles.required}>
                                        <Text style={{ fontFamily: "Cairo-Bold", fontSize: 16 }}>{this.state.count}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.plusOrMinus} onPress={this.increase}>
                                        <Image source={require("../../assets/icons/plus.png")}
                                            style={styles.plusMinusIcon} />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={styles.productDetailsTitle}>
                            <Text style={{ fontFamily: "Cairo-Bold", fontSize: 16, }}>Product Details</Text>
                        </View>
                        <View style={styles.flatListContainer}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                // contentContainerStyle={styles.grid}
                                data={this.state.data}
                                renderItem={({ item }) => (

                                    <Text style={{ flex: 1, padding: 5, fontFamily: 'Cairo-SemiBold' }}>{item}</Text>
                                )}
                                style={{ width: '100%' }}
                                horizontal={false}
                                numColumns={2}
                            ></FlatList>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.addToCart}
                        onPress={this.submitItem}
                    >
                        <Text style={{ fontFamily: "Cairo-Bold", fontSize: 16, }}>Add To Cart</Text>
                        <Image source={require("../../assets/icons/cartIn.png")}
                            style={styles.cartIcon} />
                    </TouchableOpacity>
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
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        height: '89%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        paddingBottom: 0

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
        marginBottom: 20
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
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    }

});
const mapStateToProps = state => ({
    www: state.www,
    cartReducer: state.cartReducer
})
const mapDispatchToProps = {
    setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo)