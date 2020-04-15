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
import {connect} from 'react-redux';
import HomeSreen from './Home';
import {fetchDiseaseDetails} from '../redux/actions/actions';
import Reactotron from 'reactotron-react-native'

function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
  // navigation.dispatch(DrawerActions.toggleDrawer())
}

class DiseaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseasesList: [],
    };
  }

  componentDidMount = async () => {
    await this.props.redFuncfetchDiseaseDetails(this.props.route.params.id);
    const {diseasesListAndPestsList} = this.props.mainReducer;

    const diseasesArray = diseasesListAndPestsList.filter(
      val => val.name === 'Diseases',
    );
    if (diseasesArray !== undefined && diseasesArray.length > 0) {
      this.setState({
        diseasesList: diseasesArray[0]._subCategories,
      });
    }
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate('diseaseDetails', {
            data: {id: item._catposts[0]._id, name: item.name},
          })
        }>
        <Image style={styles.cardImg} source={{uri: item.image}} />
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {diseasesList} = this.state;
    const {diseasesListAndPestsList, isLoading} = this.props.mainReducer;
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Diseases</Text>
        </View>
        <FlatList
          style={styles.diseaseList}
          data={diseasesList}
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
  redFuncfetchDiseaseDetails: fetchDiseaseDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiseaseScreen);
