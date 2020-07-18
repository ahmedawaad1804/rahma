import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Picker, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
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
/* padding */
import Padv from '../../components/ViewPad/PadV'
/*actions */
import { addAdress } from '../../actions/adressAction'
/* menu */
import { Dropdown } from 'react-native-material-dropdown';
/*expo permissions */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import adressService from '../../services/adressService'
import dataService from '../../services/dataService';
class AddAdress extends React.Component {
    state = {
        country: "Egypt",
        city: null,
        administrative_area: null,
        neighbourhood: null,
        route: null,
        street: null,
        appartement: null,

        cityList: [{
            value: 'Alex',
        }, {
            value: 'Cairo',
        }],

        administrative_areaList: [{
            value: 'Bacos',
        }, {
            value: 'Shods',
        },],
        neighbourhood: [
            'aa',
            'bb'
        ],
        errorMessage: " ",
        _error: false,
        _isLoading:false

    };


    static navigationOptions = { header: null }
    componentDidMount() {
        let temp = []
        this.state.neighbourhood.forEach(obj => {
            temp.push({ value: obj })
        })
        this.setState({ administrative_areaList: temp })
    }


    getLocationAsync = async () => {
        let status = await Permissions.askAsync(Permissions.LOCATION)
        // console.log(status);
        let location = await Location.getCurrentPositionAsync({})
        console.log(location);
        this.setState({ location })
        Geocoder.init("AIzaSyD7arViUQWyZhROPL4HKcujDdNy_fi2XW4");
        Geocoder.from(this.state.location.coords.latitude, this.state.location.coords.longitude)
            .then(json => {
                let street = json.results[0].address_components[0].long_name;
                let route = json.results[0].address_components[1].long_name;
                let neighbourhood = json.results[0].address_components[2].long_name;
                let administrative_area = json.results[0].address_components[3].long_name;
                let city = json.results[0].address_components[4].long_name;
                let country = json.results[0].address_components[5].long_name;
                this.props.addAdress({
                    street,
                    route,
                    neighbourhood,
                    administrative_area,
                    city,
                    country,
                    current: false
                },
                    
                    
                    // console.log("any")
                    setTimeout(() => {
                    dataService.addAdress(this.props.adressReducer).then().catch(err=>console.log(err))
                        
                    }, 500)
                    )

            })
            .catch(error =>
                console.warn(error)
            );

    }
    addAdressToReducer() {
        if (this.state.country && this.state.city && this.state.administrative_area
            && this.state.neighbourhood && this.state.route && this.state.appartement) {
                this.props.addAdress({
                    street: this.state.street,
                    route: this.state.route,
                    neighbourhood: this.state.neighbourhood,
                    administrative_area: this.state.administrative_area,
                    city: this.state.city,
                    country: this.state.country,
                    current: false
                })
                setTimeout(() => {
                    dataService.addAdress(this.props.adressReducer).then().catch(err=>console.log(err))
                        
                    }, 500)
                    
        }
        else {
            this.setState({ _error: true })
            this.setState({ errorMessage: "Enter a valid Adress" })

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
                        <Text style={{ fontFamily: 'Cairo-Regular', fontSize: 20, }}>Add Adress</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    </View>

                </View>

                <View style={styles.mainContainer}>
                    {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
                    {!this.state._error && (<Padv height={22} />)}
                    <Dropdown
                        label='City'
                        data={this.state.cityList}
                        containerStyle={{ width: 150 }}
                        onChangeText={(text) => this.setState({ city: text })}
                    />
                    <Dropdown
                        label='Strict'
                        data={this.state.administrative_areaList}
                        containerStyle={{ width: 150 }}
                        onChangeText={(text) => this.setState({ administrative_area: text })}
                    />
                    <Dropdown
                        label='Strict'
                        data={this.state.administrative_areaList}
                        containerStyle={{ width: 150 }}
                        onChangeText={(text) => this.setState({ neighbourhood: text })}
                    />
                    <View style={[styles.yellowContainer, { marginTop: 15 }]}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Street"
                                value={this.state.route}
                                placeholderTextColor={'#ccc'}
                                width={Dimensions.get('window').width * 4 / 5}

                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ route: text })}
                            />
                        </View>
                    </View>
                    <View style={[styles.yellowContainer, { marginTop: 15 }]}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="building"
                                value={this.state.street}
                                placeholderTextColor={'#ccc'}
                                width={Dimensions.get('window').width * 4 / 5}

                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ street: text })}
                            />
                        </View>
                    </View>
                    <View style={[styles.yellowContainer, { marginTop: 15 }]}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Appartement"
                                value={this.state.appartement}
                                placeholderTextColor={'#ccc'}
                                width={Dimensions.get('window').width * 4 / 5}

                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ appartement: text })}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.tOpacity, { marginVertical: 20 }]} onPress={() => { this.addAdressToReducer() }}>
                        <Text style={styles.text}>Add Adress</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { marginVertical: 20, fontSize: 20 }]}>OR</Text>
                    <TouchableOpacity style={[styles.tOpacity, { flexDirection: 'row' }]} onPress={() => { this.getLocationAsync() }}>
                        <Text style={styles.text}>Use Location</Text>
                        <Image
                            source={require('../../assets/icons/triger.png')}
                            style={{
                                // width: Dimensions.get('window').width * 10 * 1.2 / 375,
                                height: '50%',
                                resizeMode: 'contain'


                            }}
                        />
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

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    headerText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 22,

    },
    subHeaderText: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14
    },
    flexItem: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 80 / 812,
        marginTop: 20,
        marginHorizontal: Dimensions.get('window').width * (375 - 343) / (375 * 2),
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

    IconContainer: {
        flexDirection: 'row'
    },
    Icon: {
        width: 17,
        height: 17,
        resizeMode: "contain",

    },
    smallIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",

    },
    popUp: {
        width: Dimensions.get('window').width * 141 / 375,
        height: Dimensions.get('window').height * 102 / 812,
        backgroundColor: colors.white,
        position: 'absolute',
        right: Dimensions.get('window').width * 28 / 375,
        top: Dimensions.get('window').height * 40 / 812,
        zIndex: 10,
    },
    addText: {
        fontFamily: 'Cairo-SemiBold',
        fontSize: 13,

    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    yellowContainer: {
        flexDirection: 'row',
        backgroundColor: '#FDFDDD',
        borderRadius: 35,
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
    },
    textInputView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: Dimensions.get('window').width * (343 - 54) / 375,
        height: Dimensions.get('window').height * 46 / 812,
    },
    textInputStyle: {
        paddingHorizontal: 10,
        fontFamily: 'Cairo-Bold',
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
    adressReducer: state.adressReducer
})
const mapDispatchToProps = {
    addAdress,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAdress)