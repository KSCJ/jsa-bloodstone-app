import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { CardView } from '../common/components';

const styles = StyleSheet.create({
  cardStyle: {
    width: '100%',
    marginTop: 10,
    marginBottom: 0,
    padding: 0,
    borderRadius: 8,
  },
  headerContainer: {
    padding: 12,
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerStyle: {
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>{title}</Text>
      </View>
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
