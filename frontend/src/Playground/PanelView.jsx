import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { CardView } from '../common/components';

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 10,
    padding: 0,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerStyle: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 0,
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});


function PanelView({ title, children }) {
  return (
    <CardView style={styles.cardStyle}>
      <Text style={styles.headerStyle}>{title}</Text>
      <View style={styles.cardContent}>
        {children}
      </View>
    </CardView>
  );
}

PanelView.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PanelView.defaultProps = {
  title: 'Title',
  children: null,
};

export default PanelView;
