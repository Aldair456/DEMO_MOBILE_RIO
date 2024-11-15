import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ComoLlegarComponent() {
  return (
    <View style={{ flex: 1 }}>
      {/* Carga Google Maps en la WebView */}
      <View style={styles.mapContainer}>
        <WebView
          source={{ uri: 'https://www.google.com/maps' }} // URL básica de Google Maps
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
