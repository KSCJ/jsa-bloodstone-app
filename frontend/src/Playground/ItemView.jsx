import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  item: {
    padding: 12,
    alignItems: 'center',
    // borderWidth: 1,
    flexBasis: 90,
  },
  textStyle: {
    marginTop: 6,
    fontSize: 12,
    // fontWeight: 'bold',
  },
});

function ItemView({ title, icon }) {
  return (
    <View style={styles.item}>
      {icon}
      <Text numberOfLines={1} style={styles.textStyle}>{title}</Text>
    </View>
  );
}

ItemView.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
};

ItemView.defaultProps = {
  title: 'Item',
  icon: null,
};

export default ItemView;
