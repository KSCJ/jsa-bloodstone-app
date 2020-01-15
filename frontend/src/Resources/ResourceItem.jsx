import React from 'react';
import {
  View, Image, StyleSheet, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import AnimateNumber from 'react-native-animate-number';
import Colors from '../common/colors';

import cookieIcon from '../../assets/troop/cookie.png';
import goldIcon from '../../assets/gold.png';

const ICONS = {
  gold: { type: 'gold', icon: goldIcon },
  cookie: { type: 'cookie', icon: cookieIcon },
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 14,
    height: 14,
    marginHorizontal: 4,
  },
  text: {
    fontSize: 14,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 10,
    color: Colors.greenColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const getRateText = (rate) => {
  let rateStr;
  let textColor;
  if (rate < 0) {
    rateStr = `${rate}/min`;
    textColor = Colors.orangeColor;
  } else {
    rateStr = `+${rate}/min`;
    textColor = Colors.greenColor;
  }
  return { rateStr, textColor };
};

function handleAmount(amount) {
  if (amount >= 10000000) {
    return `${Number.parseInt(amount / 1000000, 10)}M`;
  }
  if (amount >= 10000) {
    return `${Number.parseInt(amount / 1000, 10)}K`;
  }
  return `${Number.parseInt(amount, 10)}`;
}

function ResourceItem({ type, amount, rate }) {
  const { rateStr, textColor } = getRateText(rate);
  const { icon } = ICONS[type];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.row}>
          <Image style={styles.iconStyle} source={icon} />
          <AnimateNumber
            style={styles.text}
            value={amount}
            timing="linear"
            formatter={handleAmount}
          />
        </View>
        <View style={{ marginLeft: 4 }}>
          <Text style={{ ...styles.subText, color: textColor }}>{rateStr}</Text>
        </View>
      </View>
    </View>
  );
}

ResourceItem.propTypes = {
  type: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  amount: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
};

export default ResourceItem;
