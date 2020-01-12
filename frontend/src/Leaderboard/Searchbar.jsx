import React from 'react';
import {
  TextInput, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { CardView } from '../common/components';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});

function Searchbar({
  onSubmit, placeholder, value, onValueChange,
}) {
  return (
    <CardView style={styles.container}>
      <Ionicons name="md-search" size={20} color={colors.tealColor} />
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={onValueChange}
        onSubmitEditing={() => onSubmit(value)}
        placeholder={placeholder}
      />
    </CardView>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

Searchbar.defaultProps = {
  value: '',
  onValueChange: null,
  onSubmit: null,
  placeholder: 'Search',
};

export default Searchbar;
