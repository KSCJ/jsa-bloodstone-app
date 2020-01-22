import React from 'react';
import {
  View, TouchableHighlight,
  Image, Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../common/colors';
import getIconImage from './assets';

const styles = StyleSheet.create({
  itemContainer: {
    // margin: 5,
    // padding: 10,
    paddingBottom: 5,
    // backgroundColor: '#ffffff66',
    // borderRadius: 10,

    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'rgba(0,0,0,.12)',
    alignItems: 'center',
    justifyContent: 'center',
    // flexBasis: 120,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 96,
    height: 96,
  },
  levelContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -8,
    right: -12,
    borderRadius: 10,
    backgroundColor: Colors.blueColor,
  },
  levelStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  textContainer: {
    paddingVertical: 7,
    marginHorizontal: -4,
    alignItems: 'center',
  },
});

function BuildingItem({
  type, level, onPress,
}) {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={onPress}
      style={{ flexBasis: '25%' }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image resizeMode="cover" style={styles.iconStyle} source={getIconImage(type)} />
          {/* <View style={styles.textContainer}>
            <Text style={styles.titleStyle}>{type}</Text>
          </View> */}
          {/* <View style={styles.levelContainer}>
            <Text style={styles.levelStyle}>{`Lv. ${level}`}</Text>
          </View> */}
        </View>
      </View>
    </TouchableHighlight>
  );
}

BuildingItem.propTypes = {
  type: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

BuildingItem.defaultProps = {
  onPress: null,
};

export default BuildingItem;
