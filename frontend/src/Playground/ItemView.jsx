import React from 'react';
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  item: {
    padding: 12,
    alignItems: 'center',
    flexBasis: 90,
  },
  textStyle: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
});

function ItemView({ title, icon, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.item}>
        {icon}
        <Text numberOfLines={1} style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

ItemView.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  onPress: PropTypes.func,
};

ItemView.defaultProps = {
  title: 'Item',
  icon: null,
  onPress: null,
};

export default ItemView;
