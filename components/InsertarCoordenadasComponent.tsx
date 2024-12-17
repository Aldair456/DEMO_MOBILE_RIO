import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const InsertarCoordenadasComponent = ({ onInsert }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleInsert = () => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      onInsert({ lat: parsedLat, lng: parsedLng });
    } else {
      alert('Por favor, ingresa coordenadas válidas.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Latitud" value={lat} onChangeText={setLat} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Longitud" value={lng} onChangeText={setLng} keyboardType="numeric" />
      <Button title="Insertar" onPress={handleInsert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default InsertarCoordenadasComponent;
