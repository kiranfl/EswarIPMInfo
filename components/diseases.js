import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeSreen from './Home';

function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
  // navigation.dispatch(DrawerActions.toggleDrawer())
}

class DiseaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: true,
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    this.setState({isLoaded: true});
    const url = `http://23.20.169.44/api/en-us/crops/${
      this.props.route.params.id
    }/categories`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          data: responsejson[0]._subCategories,
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({isLoaded: false});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoaded ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text style={{alignSelf: 'center', fontSize: 20}}>Diseases</Text>
            <FlatList
              numColumns={1}
              keyExtractor={item => item._id}
              data={this.state.data}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Image style={styles.image} source={{uri: item.image}} />
                  <TouchableOpacity
                    style={styles.textClick}
                    onPress={() =>
                      this.props.navigation.navigate('Preview', {
                        data: {name: item.name},
                      })
                    }>
                    <Text style={styles.content}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
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
  textClick: {
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignContent: 'center',
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

export default DiseaseScreen;
