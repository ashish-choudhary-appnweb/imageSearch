import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {fetchImagesAction} from '../actions';

const spacing = 7;
const gridWidth = (Dimensions.get('window').width - 4 * 10) / 2;
const listWidth = Dimensions.get('window').width - 4 * 10;

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.mounted = false;
    this.state = {
      searchKey: '',
      listType: true,
    };
    this.doSearch = debounce(this.doSearch, 500);
  }

  componentDidMount() {
    this.mounted = true;
    console.disableYellowBox = true;
  }

  onSearchChange(text) {
    this.setState({searchKey: text});
  }

  doSearch = text => {
    this.props.fetchImagesAction(text);
    if (this.mounted) {
      this.setState({
        searchKey: text,
      });
    }
  };

  onSearchInputChanged = text => {
    if (text.length > 2) {
      if (this.mounted) {
        this.props.fetchImagesAction(text);
        if (this.mounted) {
          this.setState({
            searchKey: text,
          });
        }
      }
      this.doSearch(text);
    }
  };

  renderItem = ({item}) => {
    const {listType} = this.state;
    let width = gridWidth;
    if (listType) {
      width = listWidth;
    }
    return (
      <View style={[styles.card, {width}]}>
        <Image style={[styles.imageStyle, {width}]} source={{uri: item.url}} />
      </View>
    );
  };

  _keyExtractor = (item, index) => `${item.id}`;

  render() {
    const {images, isSearching} = this.props;
    const {listType} = this.state;
    return (
      <View style={styles.flexAll}>
        <View style={styles.row}>
          <TextInput
            onChangeText={text => this.onSearchInputChanged(text)}
            style={styles.searchInput}
            placeholder="Search for image"
          />
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => this.setState({listType: !listType})}>
            <Text>{(listType && 'Grid') || 'List'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexAll}>
          {(isSearching && (
            <ActivityIndicator style={{marginTop: 100}} size="small" />
          )) || (
            <FlatList
              keyExtractor={this._keyExtractor}
              data={images}
              extraData={listType}
              numColumns={2}
              columnWrapperStyle={styles.column}
              renderItem={this.renderItem}
              contentContainerStyle={styles.contentContainer}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexShrink: 1,
  },
  flexAll: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 0.25,
  },
  iconStyle: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  card: {
    margin: spacing,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  imageStyle: {
    height: gridWidth,
  },
});

const mapStateToProps = state => {
  return {
    images: state.image.images,
    error: state.image.error,
    isSearching: state.image.isSearching,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchImagesAction,
  },
)(WelcomeScreen);
