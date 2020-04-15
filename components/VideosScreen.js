import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import HomeSreen from './Home';
import {fetchVideos} from '../redux/actions/actions';
import Header from './Header';
// import { Thumbnail } from 'react-native-thumbnail-video';
import Reactotron from 'reactotron-react-native';
import LinkPreview from 'react-native-link-preview';

function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
  // navigation.dispatch(DrawerActions.toggleDrawer())
}

class VideosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: '',
    };
  }

  componentDidMount = async () => {
    await this.MakeRequest();
    const {videos} = this.props.mainReducer;
    let _tempLinkData = [];
    Reactotron.log(videos.value);
    this.setState({
        isLoaded: true,
    })
    for (let link of videos.value) {
      await LinkPreview.getPreview(link.url).then(data => {
        let _newLinkDetails = {
          link: link.url,
          title: data.title,
          thumbnail: data.images[0],
        };
        _tempLinkData.push(_newLinkDetails);
      });
    }
    this.setState({items: _tempLinkData, isLoaded: false });
  };

  MakeRequest = async () => {
    await this.props.redFuncfetchVideos();
    const {videos} = this.props.mainReducer;
    this.setState({
      title: videos.name,
    });
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          Linking.openURL(`${item.link}`);
        }}>
        <Image style={styles.cardImg} source={{uri: item.thumbnail}} />
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {items} = this.state;
    const {diseasesListAndPestsList, isLoading} = this.props.mainReducer;
    if (isLoading || this.state.isLoaded) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>{this.state.title}</Text>
        </View>
        <FlatList
          style={styles.diseaseList}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  diseaseList: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
  },
  cardText: {
    flex: 8,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'center',
  },
  cardImg: {
    flex: 3,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
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
  redFuncfetchVideos: fetchVideos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideosScreen);
