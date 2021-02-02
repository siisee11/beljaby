import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo/beljaby-mini-white.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 24,
    alignSelf:'center',
    resizeMode: 'contain'
  },
});

export default memo(Logo);
