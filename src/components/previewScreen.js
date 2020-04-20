import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';

export default class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropsDetails: [],
      imagesList: [],
      activeSlide: 0,
    };
  }

  componentDidMount() {
    this.setState(
      {
        cropsDetails: this.props.route.params,
        imagesList: this.props.route.params[0].images,
        activeSlide: 0,
      },
      () => {},
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={{uri: item}}
          style={{width: '100%', height: 260, borderRadius: 20}}
        />
        {/* <View style={styles.overlay} /> */}
      </View>
    );
  };

  pageChange = index => {
    this.setState({
      imagesList: this.state.cropsDetails[index].images,
      activeSlide: 0,
    });
  };

  imagePreview = () => {
    this.props.navigation.navigate('imagePreview', {
      data: this.state.imagesList,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: hp('3'),
            right: wp('5'),
            bottom: 0,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="close" size={25} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: hp('24.5%'),
            left: wp('85%'),
            bottom: 0,
            backgroundColor: 'gray,',
          }}>
          <TouchableOpacity
            onPress={() => this.imagePreview()}
            style={styles.galleryIcon}>
            <Icon name="image" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Carousel
            ref={ref => (this.carousel = ref)}
            firstItem={0}
            sliderWidth={wp('100%')}
            itemWidth={wp('100%')}
            inactiveSlideOpacity={0.4}
            data={this.state.imagesList}
            renderItem={this._renderItem}
            layout={'tinder'}
            onSnapToItem={index => this.setState({activeSlide: index})}
            // onSnapToItem={index => this.setState({activeSlide: index})}
            onBeforeSnapToItem={index => this.setState({activeSlide: index})}
            containerCustomStyle={{overflow: 'visible'}}
            contentContainerCustomStyle={{overflow: 'visible'}}
            enableMomentum={true}
          />
          <Pagination
            dotsLength={this.state.imagesList.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: 0,
            }}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 10,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotStyle={
              {
              backgroundColor: 'red',
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{flex: 5}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            onIndexChanged={index => this.pageChange(index)}>
            {this.state.cropsDetails.map(val => {
              return (
                <ScrollView>
                  <View>
                    <HTML
                      tagsStyles={{
                        p: {fontSize: 20},
                        font: {color: '#C99700'},
                      }}
                      html={val.content}
                    />
                  </View>
                </ScrollView>
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  galleryIcon:{
    color: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
