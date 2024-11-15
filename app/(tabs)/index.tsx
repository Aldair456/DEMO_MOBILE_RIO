import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import TopTabs from '@/components/TopTabs';
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TopTabs />
      <View style={styles.inputContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    backgroundColor: '#EAF7F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#70B7C7',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
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




