import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const STORAGE_KEY = '@saved_images';

const InsertarCoordenadasComponent = ({ onInsert }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [contaminationLevel, setContaminationLevel] = useState('');
  const [plasticLevel, setPlasticLevel] = useState('');
  const [status, setStatus] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.log('Error cargando imágenes del almacenamiento local:', error);
      }
    };
    loadImages();
  }, []);

  const saveImagesToLocalStorage = async (newImages: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
    } catch (error) {
      console.log('Error guardando imágenes en almacenamiento local:', error);
    }
  };

  const handleTakePhoto = async () => {
    const { status: cameraPerm } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPerm !== 'granted') {
      alert('Se requieren permisos de cámara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: false,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri; 
      const updatedImages = [...images, uri];
      setImages(updatedImages);
      await saveImagesToLocalStorage(updatedImages);
    }
  };

  const handleInsert = () => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      alert('Por favor, ingresa coordenadas válidas.');
      return;
    }

    if (!contaminationLevel || !plasticLevel || !status) {
      alert('Por favor, selecciona todas las opciones.');
      return;
    }

    onInsert({
      lat: parsedLat,
      lng: parsedLng,
      contaminationLevel,
      plasticLevel,
      status,
      images
    });

    // Mostrar alerta de confirmación
    Alert.alert('Ubicación marcada', 'Se marcó la ubicación con éxito.', [{ text: 'OK' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        value={lng}
        onChangeText={setLng}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nivel de Contaminación</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={contaminationLevel}
          onValueChange={(itemValue) => setContaminationLevel(itemValue)}
        >
          <Picker.Item label="Selecciona una opción" value="" />
          <Picker.Item label="Bajo" value="Bajo" />
          <Picker.Item label="Medio" value="Medio" />
          <Picker.Item label="Alto" value="Alto" />
        </Picker>
      </View>

      <Text style={styles.label}>Nivel de Plástico</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={plasticLevel}
          onValueChange={(itemValue) => setPlasticLevel(itemValue)}
        >
          <Picker.Item label="Selecciona una opción" value="" />
          <Picker.Item label="Bajo" value="Bajo" />
          <Picker.Item label="Moderado" value="Moderado" />
          <Picker.Item label="Alto" value="Alto" />
        </Picker>
      </View>

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Selecciona una opción" value="" />
          <Picker.Item label="En Progreso" value="En Progreso" />
          <Picker.Item label="Pendiente" value="Pendiente" />
          <Picker.Item label="Completo" value="Completo" />
        </Picker>
      </View>

      <Button title="Tomar Foto" onPress={handleTakePhoto} />

      {images.length > 0 && (
        <View style={styles.imagesSection}>
          <Text style={styles.imagesTitle}>Imágenes tomadas</Text>
          <View style={styles.imagesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images.map((imgUri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image
                    source={{ uri: imgUri }}
                    style={styles.image}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <Button title="Insertar" onPress={handleInsert} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '600',
    color: '#333'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  imagesSection: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imagesContainer: {
    flexDirection: 'row'
  },
  imageWrapper: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
});

export default InsertarCoordenadasComponent;
