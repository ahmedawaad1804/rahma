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
class Cart extends React.Component {
    static navigationOptions = { header: null }

    state = {

        data: [],
        cost: 0,
        VAT: 0,
        deliveryCost: 0,
        total: 0,
        visible: false,
        errorMessage: " ",
        _error: false,
    };

    componentDidMount() {
        this.setState({ data: this.props.cartReducer }, () => { this.calculate() })


    }

    _increase(item) {

        this.state.data.find(obj => obj.item._id == item.item._id).count++
        this.setState({ data: this.state.data })
        this.props.setCartModifications(this.state.data)
        this.calculate()



    }
    _decrease(item) {
        if (this.state.data.find(obj => obj.item._id == item.item._id).count > 0) {
            this.state.data.find(obj => obj.item._id == item.item._id).count--
            this.setState({ data: this.state.data })
            this.props.setCartModifications(this.state.data)
            this.calculate()

        }

    }
    _delete(item) {
        this.state.data.splice(this.state.data.findIndex(obj => obj.item._id == item.item._id), 1);
        this.setState({ data: this.state.data })
        this.calculate()
    }
    calculate() {

        let sum = 0;
        this.state.data.map(item => {
            sum += item.item.price * item.count

        })
        this.setState({ cost: sum })
    }
    continue() {
        // if(this.state.data.length){
        this.setState({ visible: true })
        // console.log(this.props.cartReducer);
        // console.log(this.state.data);
        let temp = []
        this.state.data.map(item => {
            temp.push({
                productId: item.item._id,
                quantity: item.count,
                productNameEN: item.item.productNameEN,
                productNameAR: item.item.productNameAR
            })
        })
        orderService.checkOrder(temp).then(response => {
            // console.log(response.data);
            if (response.data.notFound.length == 0) {
                this.props.navigation.navigate("CartProgress")
            }
            else {
                let itemsError = ""
                response.data.notFound.forEach(element => {
                    itemsError += element.productNameEN
                });
                this.setState({ errorMessage: "Item(s) " + itemsError + " not found" })
                // console.log("Item(s) "+itemsError+ " not found");
            }
        }).catch(err => {
            this.setState({ errorMessage: err.response.data.status })
        })

        // this.props.navigation.navigate("CartProgress")
        this.setState({ visible: false })


        // }
    }
    async save() {
        try {
            await AsyncStorage.setItem(
                'cart', JSON.stringify(this.props.cartReducer)
            );

            // Toast.show("Cart Saved");

        } catch (error) {
            // Error saving data
            console.log(error);

        }



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
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>

                        <FlatList


                            key={item => { item.id }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.grid}
                            data={this.state.data}
                            renderItem={({ item }) =>
                                <View style={styles.orderOpacity}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={{uri:`http://www.beemallshop.com/img/productImages/${item.item.images[0]}`}}
                                            style={styles.imageStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center' }}>
                                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>{item.item.productNameEN}</Text>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{item.item.price} EGP</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: "50%", width: "50%" }}
                                            onPress={() => this._delete(item)}>
                                            <Image
                                                source={require('../../assets/icons/delete.png')}
                                                style={{ height: "60%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                                            onPress={() => this._increase(item)}>
                                            <Image
                                                source={require('../../assets/icons/plus.png')}
                                                style={{ width: "30%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: colors.fade, flex: 1, alignItems: 'center', justifyContent: 'center', width: "50%" }}>
                                            <Text style={{ fontSize: 14, fontFamily: "Cairo-Bold" }}>{item.count}</Text>
                                        </View>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                                            onPress={() => this._decrease(item)}>
                                            <Image
                                                source={require('../../assets/icons/minus.png')}
                                                style={{ width: "30%", resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>















                            }

                        >
                            {/* <RefreshControl  refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} /> */}

                        </FlatList>



                    </View>

                    <View style={styles.bottomMainView}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Products cost</Text>
                                {/* <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>VAT 12%</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Delivery</Text> */}
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.cost}</Text>
                                {/* <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.VAT}</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.deliveryCost}</Text> */}
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>Total Cost</Text>
                                <Text style={{ fontSize: 14, fontFamily: "Cairo-Regular" }}>EGP {this.state.cost}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: "80%", justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: colors.primary
                                }}
                                    onPress={() => { this.save() }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Cairo-SemiBold", padding: 10, }}>SAVE FOR LATER</Text>
                                </TouchableOpacity>
                            </View>
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
    errorText: {
        color: 'red',
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width * (343) / 375,

    }
});
const mapStateToProps = state => ({

    cartReducer: state.cartReducer
})
const mapDispatchToProps = {
    setCartModifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)