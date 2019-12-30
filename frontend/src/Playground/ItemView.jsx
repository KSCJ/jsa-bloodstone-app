import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  item: {
    padding: 18,
    // flexBasis: 100,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});

function ItemView({ title, icon }) {
  return (
    <View style={styles.item}>
      {icon}
      <Text>{title}</Text>
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
