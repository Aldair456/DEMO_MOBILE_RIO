import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function CentrosAcopioComponent() {
  // URL para la ubicación en Google Maps
  const googleMapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=-12.046374,-77.042793'; // Cambia las coordenadas a la ubicación deseada

  // URLs de las imágenes (cámbialas por las que necesites)
  const mainImageUrl = 'https://www.amb.gov.co/images/fotos/noticias/centro%20acopia01.jpg';
  const galleryImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  // Función para abrir Google Maps
  const openGoogleMaps = () => {
    Linking.openURL(googleMapsUrl);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Centro de acopio</Text>
      <Text style={styles.subtitle}>Nos encuentras en</Text>

      {/* Imagen principal */}
      <Image source={{ uri: mainImageUrl }} style={styles.mainImage} />

      {/* Galería de imágenes */}
      <Text style={styles.galleryTitle}>Imágenes</Text>
      <View style={styles.gallery}>
        {galleryImages.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.galleryImage} />
        ))}
      </View>

      {/* Botón para abrir Google Maps */}
      <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
        <Text style={styles.mapButtonText}>Abrir Google Maps para guiado</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#EAF7F8',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  mainImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginVertical: 10,
  },
  gallery: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  mapButton: {
    backgroundColor: '#70B7C7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
