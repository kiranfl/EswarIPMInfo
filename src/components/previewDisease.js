import * as React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeSreen from './Home';


class PreviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Eswar', id: '1'},
        {name: 'Ramudu', id: '2'},
        {name: 'Ramana', id: '3'},
        {name: 'Eswar', id: '4'},
        {name: 'Ramudu', id: '5'},
        {name: 'Ramana', id: '6'},
        {name: 'Eswar', id: '7'},
        {name: 'Ramudu', id: '8'},
        {name: 'Ramana', id: '9'},
        {name: 'Eswar', id: '10'},
        {name: 'Ramudu', id: '11'},
        {name: 'Ramana', id: '12'},
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center', fontSize: 20}}>{this.props.route.params.data.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f8f8ff',
    flex: 1,
    width: '100%',
    // alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
    fontSize: 16,
    alignSelf: 'center',
    width: '100%',
    marginLeft: '50%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
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

export default PreviewScreen;
