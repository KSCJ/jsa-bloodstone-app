import React, { useState } from 'react';
import {
  TextInput, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { CardView } from '../common/components';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});

function SearchBar({ onSubmit, placeholder }) {
  const [value, setValue] = useState('');
  return (
    <CardView style={styles.container}>
      <Ionicons name="md-search" size={20} color={colors.tealColor} />
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={() => onSubmit(value)}
        placeholder={placeholder}
      />
    </CardView>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  onSubmit: null,
  placeholder: 'Search',
};

export default SearchBar;
