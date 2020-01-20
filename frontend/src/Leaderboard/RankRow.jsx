import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text,
  StyleSheet,
} from 'react-native';
import { SubCardView } from '../common/components';
import goldIcon from '../../assets/gold.png';
import crownIcon from '../../assets/crown.png';
import userAvatar from '../../assets/user-avatar.png';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    paddingVertical: 8,
  },
  text: {
    fontSize: 14,
    color: Colors.whiteColor,
  },
  usernameText: {
    width: 120,
    fontSize: 14,
    color: Colors.whiteColor,
  },
  userAvatar: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
});

function RankRow({
  rank, username, gold, kingdoms,
}) {
  return (
    <SubCardView style={styles.container}>
      <View style={styles.rowFlex}>
        <Text style={styles.text}>{rank}</Text>
        <Image style={styles.userAvatar} source={userAvatar} />
        <Text style={styles.usernameText} numberOfLines={1}>{username}</Text>
      </View>
      <View style={styles.rowFlex}>
        {/* <View style={styles.userInfo}>
          <Image style={styles.icon} source={goldIcon} />
          <Text style={styles.text}>{gold}</Text>
        </View> */}
        <View style={styles.userInfo}>
          <Image style={styles.icon} source={crownIcon} />
          <Text style={styles.text}>{username === 'clay' ? 3 : 1}</Text>
        </View>
      </View>
    </SubCardView>
  );
}

RankRow.propTypes = {
  rank: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  kingdoms: PropTypes.number.isRequired,
};

export default RankRow;
