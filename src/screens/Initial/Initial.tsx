import {AppColor} from '@/styles';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

function InitScreen() {
  return (
    <ImageBackground
      source={require('@Assets/images/background.png')}
      resizeMode="cover"
      style={styles.root}>
      <Image source={require('@Assets/images/logo.png')} style={styles.logo} />
      <ActivityIndicator size="small" color={AppColor.primary[400]} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {},
});

export default InitScreen;
