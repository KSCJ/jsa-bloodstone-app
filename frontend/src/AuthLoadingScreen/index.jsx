import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, Image, StyleSheet, ImageBackground,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import logo from '../../assets/logoSpace.png';
import loadingIcon from '../../assets/loading.gif';
import background from '../../assets/authBackground.gif';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  logo: {
    height: 200,
    width: 300,
    position: 'absolute',
    top: 5,
  },
  loading: {
    height: 100,
    width: 300,
    position: 'absolute',
    bottom: 50,
  },
});

function AuthLoadingScreen() {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  setTimeout(() => {
    if (token) {
      return navigation.navigate('Home');
    }
    return navigation.navigate('Auth');
  }, 1200);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={background}
      >
        <Image style={styles.logo} source={logo} />
        <Image style={styles.loading} source={loadingIcon} />
      </ImageBackground>
    </View>
  );
}

export default AuthLoadingScreen;
