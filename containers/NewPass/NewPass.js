import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation';

class NewPass extends React.Component {
  // static navigationOptions = {
  //   title: 'My home',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   // headerTitleStyle: {
  //   //   fontWeight: 'bold',
  //   // },
  //   // headerRight: () => (
  //   //   <View> <Text>daf</Text></View>

  //   //  )
  // }
  static navigationOptions = ({ navigation, screenProps }) => ({
   
      headerStyle: {
      backgroundColor: colors.primary,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerLeft: (<TouchableOpacity style={{ marginBottom: 30, marginLeft: 30, padding: 15 }} onPress={() => { navigation.pop() }}>
      <Image
        source={require('../../assets/icons/back.png')}
        style={{
          width: Dimensions.get('window').width * 10 / 375,
          height: Dimensions.get('window').height * 18 / 812,
        }}
      />
    </TouchableOpacity>),
    headerTitle: (
      <View style={{
        width: Dimensions.get('window').width * 1 / 2,
        marginLeft: 40, alignItems: 'center', marginBottom: 30,
      }}>
        <Text style={{
          fontFamily: 'Cairo-Regular',
          fontSize: 20,
        }}>Forgot Password</Text>
      </View>
    ),

    // headerStyle: {
    //       backgroundColor: '#f4511e',

    //     },
    // headerTitle: <Text>dfdasf</Text>
    // , headerLeft: <Button title="Forgot" onPress={() => { navigation.pop() }} />,
  });

  state = {
    checked: false
  }
  componentDidMount() {

    console.log('forgot');

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * (Header.HEIGHT) / 812 }}></View>
        <View style={styles.textView}>
          <Text style={styles.instructionText}>Enter your new password</Text>
        </View>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 19 / 812 }}></View>

          <View style={[styles.yellowContainer, styles.yellowUpperOnly]}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/envlop.png")}
                style={styles.imageStyle} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Phone Number"
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                errorStyle={{ color: 'red' }}
                errorMessage={true ? 'Email is invalid' : ''}

                autoCapitalize='none'
                secureTextEntry

              />
            </View>
          </View>
         
          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 28 / 812 }}></View>

          <TouchableOpacity style={styles.tOpacity}
            onPress={() => { this.props.navigation.navigate('Login') }}>
            <Text style={styles.text}>SAVE</Text>
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
    justifyContent: 'flex-end',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    width: 30,
    height: 25,
    padding: 0
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
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width -85,
    marginRight:85
    ,
  },
  instructionText: {
    marginLeft:Dimensions.get('window').width *32 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 14
    ,
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
  }
});
const mapStateToProps = state => ({
  www: state.www
})
export default connect(mapStateToProps)(NewPass)