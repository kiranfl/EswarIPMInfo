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
    };
    this.animated = new Animated.Value(0);
  }


  componentDidMount = async () => {
    await this.props.redFuncfetchCropsData();
    const {cropsList} = this.props.mainReducer;
    if (cropsList !== undefined && cropsList.length > 0) {
      this.setState({
        name: cropsList[0].name,
        originalName: cropsList[0].scientificName,
        description: cropsList[0].description,
        id: cropsList[0].id,
        img: cropsList[0].image,
      });
    }
    this.animated.setValue(1);
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
    this.animated.setValue(0);
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  renderItem = ({item}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Animated.Image
          source={{uri: item.image}}
          style={{width: 200, height: 260, borderRadius: 20}}
        />
        {/* <View style={styles.overlay} /> */}
      </View>
    );
  };

  render() {
    const {cropsList, isLoading} = this.props.mainReducer;
    const opacity = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });
    // const transform = [{translateX}];
    const translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0],
    });
    // const transform = [{translateY}];
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 6,
            marginTop: 15,
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Animated.Text
            style={[
              {
                textTransform: 'uppercase',
                fontSize: 25,
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 15,
              },
              {translateX},
            ]}>
            {this.state.name}
          </Animated.Text>
          <Carousel
            ref={ref => (this.carousel = ref)}
            firstItem={2}
            sliderWidth={wp('100%')}
            itemWidth={200}
            inactiveSlideOpacity={0.4}
            data={cropsList}
            renderItem={this.renderItem}
            onSnapToItem={index => this.detailsSet(index)}
            onBeforeSnapToItem={index => this.detailsSet(index)}
            containerCustomStyle={{overflow: 'visible'}}
            contentContainerCustomStyle={{overflow: 'visible'}}
            enableMomentum={true}
          />
        </View>
        <View style={{flex: 1.5, alignItems: 'center', padding: 20}}>
          <Animated.Text
            style={[{marginTop: 5, fontSize: 24, padding: 5}, {translateY}]}>
            {this.state.originalName}
          </Animated.Text>
          <Text style={{textAlign: 'center', width: wp('90%')}}>
            {this.state.description}
          </Text>
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <ImageBackground
            source={{uri: this.state.img}}
            style={styles.imagePreview}>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('MoreDetails', {
                    data: {id: this.state.id},
                  })
                }>
                <View>
                  <Text style={styles.moredetails}>More details</Text>
                </View>
                <View style={styles.icon}>
                  <Icon size={18} name="chevron-right" color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imagePreview: {
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('30%'),
    opacity: 0.8,
  },
  footer: {
    position: 'relative',
    width: wp('100%'),
    height: hp('8%'),
    top: 85,
    bottom: 0,
    paddingTop: wp('3.3%'),
    backgroundColor: 'white',
  },
  moredetails: {
    textAlign: 'center',
    fontSize: hp('3%'),
  },
  icon: {
    position: 'absolute',
    width: 30,
    top: 0,
    right: 8,
    height: 30,
    borderRadius: 50,
    paddingLeft: 10,
    paddingTop: 6,
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
