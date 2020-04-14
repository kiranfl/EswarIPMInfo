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
  ImageBackground,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchCropsData} from '../redux/actions/actions';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      data: [],
      originalName: '',
      description: '',
      id: '',
      img: null,
      fadeValue: new Animated.Value(0),
    };
  }
  componentDidMount = async () => {
    await this.props.redFuncfetchCropsData();

  };

  componentWillReceiveProps = nextProps => {
    const {cropsList} = nextProps.mainReducer;
if(cropsList !== undefined && cropsList.length > 0) {
    this.setState({
      name: cropsList[0].name,
      originalName: cropsList[0].scientificName,
      description: cropsList[0].description,
      id: cropsList[0].id,
      img: cropsList[0].image,
    });
  }
  };

  detailsSet = async index => {
    const {cropsList} = this.props.mainReducer;
    this.setState(
      {
        name: cropsList[index].name,
        originalName: cropsList[index].scientificName,
        description: cropsList[index].description,
        id: cropsList[index].id,
        img: cropsList[index].image,
      },
      function() {},
    );
  };

  _renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
    );
  };

  render() {
    const {width} = Dimensions.get('window');
    const {cropsList, isLoading} = this.props.mainReducer;
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
        <Carousel
          ref={ref => (this.carousel = ref)}
          inactiveSlideOpacity={0.4}
          inactiveSlideScale={0.65}
          firstItem={2}
          sliderWidth={width}
          itemWidth={200}
          itemHeight={0}
          data={cropsList}
          renderItem={this._renderItem}
          onSnapToItem={index => this.detailsSet(index)}
          styels={{height: 100}}
          enableMomentum={true}
        />
        <View style={styles.originalNameContainer}>
          <Text style={styles.originalName}> {this.state.originalName}</Text>
          <Text>Descriptisdon: {this.state.description}</Text>
        </View>
        <View>
          <ImageBackground
            source={{uri: this.state.img}}
            style={styles.imagePreview}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderTopColor: 'gray',
            borderTopWidth: 0.6,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity style={{flex: 2, alignItems: 'center'}} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MoreDetails', {
                data: {id: this.state.id},
              })
            }
            style={{flex: 6, alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontWeight: 'Bold',
                  fontSize: hp('3%'),
                  marginTop: hp('2%'),
                }}>
                More details
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 2, alignItems: 'center'}}>
            <View style={{marginTop: 20, alignSelf: 'flex-end'}}>
              <View
                style={{
                  width: 30,
                  padding: 5,
                  paddingLeft: 8,
                  height: 30,
                  borderWidth: 1,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  borderColor: 'gray',
                }}>
                <Icon size={20} name="chevron-right" color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {},
  name: {
    fontSize: 30,
  },
  animationView: {},
  imagePreview: {
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('30%'),
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderBottomRightRadius: 20,
  },
  description: {},
  originalNameContainer: {},
  originalName: {
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    borderColor: 'black',
    borderWidth: 1,
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

const mapStateToProps = state => ({
  mainReducer: state,
});

const mapDispatchToProps = {
  redFuncfetchCropsData: fetchCropsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
