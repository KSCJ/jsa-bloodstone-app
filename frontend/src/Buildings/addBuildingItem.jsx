import React from 'react';
import {
  View, Image, StyleSheet,
  TouchableHighlight, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../common/colors';
import FontStyle from '../common/fonts';

const styles = StyleSheet.create({
  itemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
  },
  iconStyle: {
    width: 32,
    height: 32,
  },
  textStyle: {
    marginLeft: 8,
    fontSize: FontStyle.fontSize,
    fontWeight: 'bold',
  },
  subText: {
    marginLeft: 8,
    fontSize: 10,
    color: Colors.orangeColor,
  },
});

function AddBuildingItem({
  icon, type, onPress, price,
}) {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={onPress}>
      <View style={styles.itemStyle}>
        <Image style={styles.iconStyle} source={icon} />
        <View>
          <Text style={styles.textStyle}>{`Add ${type}`}</Text>
          <Text style={styles.subText}>{`-${price} golds`}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

AddBuildingItem.propTypes = {
  icon: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

AddBuildingItem.defaultProps = {
  onPress: null,
};

export default AddBuildingItem;
