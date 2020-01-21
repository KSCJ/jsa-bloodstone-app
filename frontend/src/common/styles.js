import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Colors from './colors';

const shadowEffect = {
  shadowColor: Colors.blackColor,
  shadowOpacity: 0.1,
  shadowOffset: { x: 0, y: 4 },
  shadowRadius: 5,
  elevation: 3,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  textStyle: {
    color: Colors.textColor,
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  cardStyle: {
    ...shadowEffect,
    padding: 12,
    borderRadius: 3,
    backgroundColor: Colors.transparentWhiteColor,
  },
  subCardStyle: {
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 4 },
    shadowRadius: 6,
    marginBottom: 2,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: Colors.tealColor,
    flexDirection: 'row',
    elevation: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  keyboardAvoidContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
