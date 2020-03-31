import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';

function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
  // navigation.dispatch(DrawerActions.toggleDrawer())
}

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: '',
      originalName: '',
      description: '',
      id: '',
    };
  }

  componentDidMount = () => {
    const url = 'http://23.20.169.44/api/en-us/crops';
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          data: responsejson,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  detailsSet = index => {
    console.log(index);
    this.setState(
      {
        name: this.state.data[index].name,
        originalName: this.state.data[index].scientificName,
        description: this.state.data[index].description,
        id: this.state.data[index].id,
      },
      function() {
        console.log(index);
      },
    );
  };

  // renderItem = ({item}) => {
  //   return (
  //     <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
  //       <Image
  //         source={{uri: item.image}}
  //         style={{width: 100, height: 100, margin: 5}}
  //       />
  //       <View styels={{flex: 1, justifyContent: 'center'}}>
  //         <Text style={{marginBottom: 5}}>{item.name}</Text>
  //         <Text>{item.scientificName}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  _renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri: item.image}} style={{width: 250, height: 250}} />
        <Text>{item.name}</Text>
      </View>
    );
  };

  render() {
    const {width} = Dimensions.get('window');
    return (
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        /> */}
        <Carousel
          ref={ref => (this.carousel = ref)}
          // inactiveSlideOpacity={0.6}
          // inactiveSlideScale={0.65}
          firstItem={1}
          sliderWidth={1000}
          itemWidth={250 / 2}
          height={150}
          data={this.state.data}
          renderItem={this._renderItem}
          onSnapToItem={index => this.detailsSet(index)}
          onBeforeSnapToItem={index => this.detailsSet(index)}
          containerCustomStyle={{overflow: 'visible'}}
          contentContainerCustomStyle={{overflow: 'visible'}}
          enableMomentum={true}
        />
        <Text>{this.state.name}</Text>
        <Text>{this.state.originalName}</Text>
        <Text>{this.state.description}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="More details"
            onPress={() => this.props.navigation.navigate('MoreDetails', {data: {id: this.state.id}})}
          />
        </View>
      </SafeAreaView>
    );
  }
}

// function HomeScreen({navigation}, props) {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         numColumns={1}
//         keyExtractor={item => item.id}
//         data={this.state.data}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <Image style={styles.image} source={require('../download.png')} />
//             <TouchableOpacity
//               style={styles.textClick}
//               onPress={() =>
//                 this.props.navigation.navigate('Preview', {
//                   data: {name: item.name},
//                 })
//               }>
//               <Text style={styles.content}>{item.name}</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       <View style={styles.buttonContainer}>
//         <Button
//           title="More details"
//           onPress={() => navigation.navigate('MoreDetails')}
//         />
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
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

export default HomeScreen;
