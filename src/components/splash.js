import * as React from 'react';
import {View, Text, Image, StyleSheet, StatusBar, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
  // navigation.dispatch(DrawerActions.toggleDrawer())
}

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Fever', id: '1'},
        {name: 'Dengue', id: '2'},
        {name: 'Malaria', id: '3'},
        {name: 'Jaundice', id: '4'},
        {name: 'Cough', id: '5'},
        {name: 'Cold', id: '6'},
        {name: 'Body Pains', id: '7'},
        {name: 'Headache', id: '8'},
        {name: 'Heart', id: '9'},
        {name: 'Lungs', id: '10'},
        {name: 'Kidneys', id: '11'},
        {name: 'Eyes', id: '12'},
      ],
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.props.navigation.navigate('Main');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.textHeading}>IPMinfo</Text>
        </View>
        <View styel={styles.textCotainer}>
          <Text style={styles.text}>Version1.0</Text>
        </View>
        <StatusBar
          style={styles.StatusBar}
          backgroundColor="rgb(235, 183, 52)"
        />
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(235, 183, 52)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeading: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  StatusBar: {
    backgroundColor: 'rgb(235, 183, 52)',
    height: STATUSBAR_HEIGHT,
  },
  textCotainer: {flex: 1},
  text: {
    fontSize: 15,
    color: 'white',
    marginBottom: 60,
  },
  image: {
    height: hp('10%'),
    width: wp('20%'),
  },
});

export default Splash;
