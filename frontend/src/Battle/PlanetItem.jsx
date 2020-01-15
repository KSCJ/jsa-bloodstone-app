import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Animated, Easing, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { getPlanetImage, PLANET_IMAGES } from './assets';

const styles = StyleSheet.create({
  imageStyle: {
    width: 64,
    height: 64,
  },
});

const FLOAT_AMPLITUDE = 5;

function PlanetItem({ type, active, onSelectChange }) {
  const [floatY] = useState(new Animated.Value(0));
  const { src } = getPlanetImage(type);

  function handlePress() {
    if (!active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatY, {
            toValue: FLOAT_AMPLITUDE,
            easing: Easing.inOut((t) => t),
          }),
          Animated.timing(floatY, {
            toValue: 0,
            easing: Easing.inOut((t) => t),
          }),
          Animated.timing(floatY, {
            toValue: -FLOAT_AMPLITUDE,
            easing: Easing.inOut((t) => t),
          }),
          Animated.timing(floatY, {
            toValue: 0,
            easing: Easing.inOut((t) => t),
          }),
        ]),
        { iterations: -1 },
      ).start();
      onSelectChange(type);
    }
  }

  useEffect(() => {
    if (!active) {
      Animated.timing(floatY, {
        toValue: 0,
        easing: Easing.inOut((t) => t),
      }).start();
    }
  }, [active]);

  return (
    <Animated.View style={{ transform: [{ translateY: floatY }] }}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Image source={src} style={styles.imageStyle} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

PlanetItem.propTypes = {
  type: PropTypes.oneOf(Object.keys(PLANET_IMAGES)).isRequired,
  active: PropTypes.bool,
  onSelectChange: PropTypes.func,
};

PlanetItem.defaultProps = {
  active: false,
  onSelectChange: null,
};

export default PlanetItem;
