import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppDetails from './service/AppService';



const Loader: React.FC = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={AppDetails.color.iconColors} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the view fill its parent
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensures the loader is on top of other content
  },
});

export default Loader;
