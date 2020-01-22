import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Image, View, TouchableHighlight, Dimensions, StyleSheet,
} from 'react-native';
import Colors from '../common/colors';

const vw = Math.round(Dimensions.get('window').width / 600);
const FONT_SIZE = 12 * vw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  textStyle: {
    marginTop: 5,
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
});

function MenuItem({
  src, name, onPress, activeComponent,
}) {
  const containerColorStyle = {
    backgroundColor: activeComponent === name
      ? Colors.lightTeal4
      : Colors.transparent,
  };
  const textColorStyle = {
    color: activeComponent === name
      ? '#333'
      : '#bdbdbd',
  };
  return (
    <TouchableHighlight
      style={[styles.container, containerColorStyle]}
      onPress={() => onPress(name)}
      underlayColor={Colors.white20Color}
    >
      <View style={styles.container2}>
        <Image style={{ flex: 1 }} source={src} resizeMode="contain" />
        <Text numberOfLines={1} style={[styles.textStyle, textColorStyle]}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

MenuItem.propTypes = {
  src: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  activeComponent: PropTypes.string,
};

MenuItem.defaultProps = {
  onPress: null,
  activeComponent: '',
};

export default MenuItem;
