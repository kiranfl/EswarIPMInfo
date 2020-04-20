import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import ImageView from 'react-native-image-viewing';

export default class imagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [],
      isImageViewVisible: true,
    };
  }

  componentDidMount() {
    const newImageArray2 = [];
    for (var i = 0; i < this.props.route.params.data.length; ++i) {
      var rv = {};
      rv['uri'] = this.props.route.params.data[i];
      newImageArray2.push(rv);
    }
    this.setState({
      imagesList: newImageArray2,
    });
  }

  closeRequest = () => {
    this.setState({isImageViewVisible: false});
    this.props.navigation.navigate('PreviewScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageView
          images={this.state.imagesList}
          imageIndex={0}
          visible={this.state.isImageViewVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => this.closeRequest()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
