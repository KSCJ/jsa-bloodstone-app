import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, Animated, Image, Easing,
} from 'react-native';
import PropTypes from 'prop-types';

import userAvatar from '../../assets/user-avatar.png';
import { CardView, SubCardView } from '../common/components';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  avatarStyle: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  healthbarStyle: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    // borderWidth: 1,
  },
  healthbarContainer: {
    position: 'relative',
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5,
    // paddingLeft: -10,
    overflow: 'hidden',
  },
  textStyle: {
    color: Colors.whiteColor,
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
});

function getAnimatedStyle(width, statusColor) {
  return {
    ...styles.healthbarStyle,
    backgroundColor: statusColor,
    width: width.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '108%'],
    }),
  };
}

function ReportItem({
  name, myLoss, enemyLoss,
}) {
  const [myWidth] = useState(new Animated.Value(100));
  const [enemyWidth] = useState(new Animated.Value(100));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(myWidth, {
        toValue: 100 - myLoss,
        duration: 2000,
        easing: Easing.out((t) => t),
      }),
      Animated.timing(enemyWidth, {
        toValue: 100 - enemyLoss,
        duration: 2000,
        easing: Easing.out((t) => t),
      }),
    ]).start();
  }, []);

  return (
    <CardView style={styles.container}>
      <Text style={styles.headerStyle}>{name}</Text>
      <SubCardView style={[styles.healthbarContainer, { backgroundColor: Colors.darkBlueColor }]}>
        <Animated.View style={getAnimatedStyle(myWidth, Colors.blueColor)} />
        <Image source={userAvatar} style={styles.avatarStyle} />
        <Text style={styles.textStyle}>{`My troop left ${100 - myLoss}%`}</Text>
      </SubCardView>
      <SubCardView style={[styles.healthbarContainer, { backgroundColor: Colors.darkRedColor }]}>
        <Animated.View style={getAnimatedStyle(enemyWidth, Colors.redColor)} />
        <Image source={userAvatar} style={styles.avatarStyle} />
        <Text style={styles.textStyle}>{`Enemy troop left ${100 - enemyLoss}%`}</Text>
      </SubCardView>
    </CardView>
  );
}

ReportItem.propTypes = {
  name: PropTypes.string,
  myLoss: PropTypes.number,
  enemyLoss: PropTypes.number,
};

ReportItem.defaultProps = {
  name: 'Report name',
  myLoss: 0,
  enemyLoss: 0,
};

export default ReportItem;
