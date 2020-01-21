import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import CardView from './CardView';

const style = {
  height: 40,
  margin: 5,
  paddingStart: 10,
  fontSize: 14,
};

function InputField({
  value, onChangeText, placeholder, secureTextEntry,
}) {
  const [isFocus, setFocus] = useState(false);

  const extraStyle = {
    margin: 0,
    padding: 0,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'rgba(0,0,0,.12)',
    elevation: isFocus ? 2 : 0,
  };

  return (
    <CardView style={extraStyle}>
      <TextInput
        style={style}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#aaa"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </CardView>
  );
}

InputField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
};

InputField.defaultProps = {
  value: '',
  placeholder: 'placeholder',
  onChangeText: null,
  secureTextEntry: false,
};

export default InputField;
