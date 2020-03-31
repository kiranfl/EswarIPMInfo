import * as React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeSreen from './Home';

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
    setInterval(() => {this.props.navigation.navigate('Main')}, 3000);
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>IPMinfo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'green',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  }
});

// <View
//               style={styles.card}
//               onTouchStart={() => console.log(item.name)}>
//               <View style={styles.image}>
//                 <Text>Images</Text>
//               </View>
//               <View style={styles.content}>
//                 <Text>{item.name}</Text>
//               </View>
//             </View>
// function DiseaseScreen(navigation, props) {
//   return (
//     <View style={styles.container}>
//       <Text>Diseases</Text>
//       <FlatList
//         keyExtractor={item => item.key}
//         data={this.state.data}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <View style={styles.image}>
//               <Image />
//             </View>
//             <View style={styles.content}>
//               <Text>{item.name}</Text>
//             </View>
//           </View>
//         )}
//       />
//       <View style={styles.card}>
//         <View style={styles.image}>
//           <Image />
//         </View>
//         <View style={styles.content}>
//           <Text>Sometext</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

export default Splash;
