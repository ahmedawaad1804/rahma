import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* spinner */
import Spinner from 'react-native-loading-spinner-overlay';
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCartModifications } from '../../actions/product'
import { Header } from 'react-navigation';
/* toast */
// import Toast from 'react-native-simple-toast';
/* component */
import CartItem from '../../components/CartItem/CartItem'
/* storage */
import { AsyncStorage } from 'react-native';
import dataService from '../../services/dataService';
import orderService from "../../services/orderService"
class CartProgress extends React.Component {
    static navigationOptions = { header: null }

    state = {

        data: [],
        cost: 0,
        VAT: 0,
        deliveryCost: 0,
        total: 0,
        visible: false,
        promo: 0,
        errorMessage: " ",
        _error: false,
        promoCodeText: null,
        promoCode: null,
        promoDiscount: 0,
        currentAddress:null
    };

    componentDidMount() {
        orderService.calculateOrder({ orderItems: this.props.cartReducer, promo: this.state.promoCodeText }).then(res => {
            console.log(res.data);
            if (res.data.promoCode) {
                this.setState({ promoDiscount: res.data.promoCode.amount })
                this.setState({ promoCode: res.data.promoCode.name })
            }
            else {
                this.setState({ promoCode: null })
            }
            this.setState({ cost: res.data.price })
            this.setState({ deliveryCost: res.data.delivaryFee })
            this.calculate()
        }).catch(err => {
            console.log(err);
        })
        // this.setState({ data: this.props.cartReducer }, () => { this.calculate() })
        this.setState({ adress: this.props.adressReducer })
        this.props.adressReducer.map(item=>{
            if (item.current) {
                this.setState({currentAddress:item})
            }
        })
        this.unsubscribe = store.subscribe(() => {
            setTimeout(() => {
                this.setState({ adress: this.props.adressReducer })
                this.props.adressReducer.map(item=>{
                    if (item.current) {
                        this.setState({currentAddress:item})
                    }
                })
            }, 400);


        });

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    goToAdress() {
        this.props.navigation.navigate("Adress")
    }
    checkPromo() {
        //check promo the set promo code to this discount
        // set promo and sit discount
        // set visibility
    }
    continue() {
        // if(this.state.data.length){
        this.setState({ visible: true })
        // dataService.checkCartItems(this.state.data).then()
        setTimeout(() => {
            this.props.navigation.navigate("Payment", {
                products: this.props.cartReducer,
                totalOrder: this.state.total,
                scheduled:false,
                address:this.state.currentAddress,
                scheduledDate:null,
                promoCode:this.state.promoCode
            })
            this.setState({ visible: false })

        }, 2000);
        // }
    }
    calculate() {
        let total = 0;
        total = this.state.cost + this.state.deliveryCost - (this.state.promoCode ? this.state.promoDiscount : 0)
        this.setState({ total })
    }
    async sendPromo() {
        this.setState({ visible: true })
        await orderService.calculateOrder({ orderItems: this.props.cartReducer, promo: this.state.promoCodeText }).then(res => {
            console.log(res.data);
            if (res.data.promoCode) {
                this.setState({ promoDiscount: res.data.promoCode.amount })
                this.setState({ promoCode: res.data.promoCode.name })
            }
            else {
                this.setState({ promoCode: null })
            }
            this.setState({ cost: res.data.price })
            this.setState({ deliveryCost: res.data.delivaryFee })
            this.calculate()
        }).catch(err => {
            console.log(err);
        })
        this.setState({ visible: false })

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} />
                </View>
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
                        }}>Cart</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <View style={{ alignItems: 'flex-start', width: "100%", marginTop: 20 }}>
                            <Text style={styles.titleText}>Address</Text>
                        </View>
                        <TouchableOpacity style={styles.flexItem} onPress={() => this.goToAdress()}>
                            <View style={{ flex: 1.5, alignItems: 'center' }}>
                                <Image source={require("../../assets/icons/marker.png")}
                                    style={styles.phoneIcon} />
                            </View>
                            <View style={{ flex: 7.5, }}>
                                {
                                    this.state.adress ?
                                        this.state.adress.map(item => {
                                            if (item.current) {
                                                // this.setState({currentAddress:item})
                                                // console.log(item);
                                                // console.log("item");
                                                return <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 12 }}>{item.street} {item.route} {item.neighbourhood} {item.administrative_area} {item.city}</Text>
                                            }
                                        }) : <Text>No adress yet</Text>}
                            </View>
                            <View style={{ flex: 2.5, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 13 }}>Manage  </Text>
                                <Image source={require("../../assets/icons/setting.png")}
                                    style={styles.phoneIcon} />
                            </View>
                        </TouchableOpacity>
                        {/* <Text>ffff</Text> */}
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: colors.primary
                                }}>
                                    <TextInput
                                        style={{
                                            width: "70%", height: Dimensions.get('window').height * 46 / 812
                                        }}
                                        placeholder="promoCode"
                                        value={this.state.promoCodeText}
                                        placeholderTextColor={'#ccc'}
                                        autoCapitalize='none'
                                        onChangeText={(text) => this.setState({ promoCodeText: text })}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                                }}
                                    onPress={(text) => { this.sendPromo() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>Add Promo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                    <View style={styles.bottomMainView}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Products cost</Text>
                                {this.state.promoCode && (<Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>promo</Text>)}
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Delivery</Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.cost}</Text>
                                {this.state.promoCode && (<Text style={{ fontSize: 14, fontFamily: "Cairo-Regular", color: 'red' }}>EGP -{this.state.promoDiscount}</Text>)}
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.deliveryCost}</Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Total Cost</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.total}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: colors.primary
                                }}
                                    onPress={() => { this.continue() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>CONTINUE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                </View>


            </View >



        )

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
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 0

    },

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    text: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    instructionText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 13
        ,
    },
    headerText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
    bottomMainView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 180 / 812,
    },
    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        flexDirection: "row",
        borderTopWidth: 1
    },
    imageStyle: {
        height: "90%",
        width: "100%",
        resizeMode: 'contain'
    },
    flexItem: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 80 / 812,
        marginTop: 20,
        flexDirection: 'row',
        padding: 5,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        // borderWidth:3,
        backgroundColor: colors.white,
        borderRadius: 15,

    },
    phoneIcon: {
        width: 17,
        height: 17,
        resizeMode: "contain",

    },
    titleText: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        fontFamily: 'Cairo-Bold',
        fontSize: 20,
        backgroundColor: colors.white
    },
    errorText: {
        color: 'red',
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width * (343) / 375,
    },

});
const mapStateToProps = state => ({

    cartReducer: state.cartReducer,
    adressReducer: state.adressReducer,

})
const mapDispatchToProps = {
    setCartModifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartProgress)