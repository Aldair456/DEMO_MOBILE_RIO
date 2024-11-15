
//     pin1: ['https://cooperaccion.org.pe/wp-content/uploads/2024/04/fa8a7ecb-2a7e-40c5-b7a6-32c522c3c510.webp', 'https://larepublica.cronosmedia.glr.pe/original/2023/07/15/64b2e1bf7049c37fa2267037.jpg'],

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LugaresAfectadosComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([-77.0681, -11.9159]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({ images: [], contaminationLevel: '', plasticLevel: '' });

  // Información para cada pin
  const pinData = {
    pin1: {
      images: ['https://cooperaccion.org.pe/wp-content/uploads/2024/04/fa8a7ecb-2a7e-40c5-b7a6-32c522c3c510.webp', 'https://larepublica.cronosmedia.glr.pe/original/2023/07/15/64b2e1bf7049c37fa2267037.jpg'],
      contaminationLevel: 'Alto',
      plasticLevel: 'Elevado',
    },
    pin2: {
      images: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'],
      contaminationLevel: 'Medio',
      plasticLevel: 'Moderado',
    },
    pin3: {
      images: ['https://example.com/image5.jpg', 'https://example.com/image6.jpg'],
      contaminationLevel: 'Bajo',
      plasticLevel: 'Mínimo',
    },
    pin4: {
      images: ['https://example.com/image7.jpg', 'https://example.com/image8.jpg'],
      contaminationLevel: 'Medio',
      plasticLevel: 'Alto',
    },
  };

  // Función para abrir el modal con la información seleccionada
  const openModalWithInfo = (pinId) => {
    setSelectedInfo(pinData[pinId]);
    setModalVisible(true);
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>MapLibre GL JS</title>
      <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
      <script src="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.js"></script>
      <link href="https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css" rel="stylesheet" />
      <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = new maplibregl.Map({
          container: 'map',
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [${mapCenter[0]}, ${mapCenter[1]}],
          zoom: 14
        });

        const puntosVerdes = [
          { coordinates: [-77.0670, -11.9165], id: 'pin1' },
          { coordinates: [-77.0695, -11.9178], id: 'pin2' },
          { coordinates: [-77.0660, -11.9150], id: 'pin3' },
          { coordinates: [-77.0700, -11.9185], id: 'pin4' }
        ];

        puntosVerdes.forEach(({ coordinates, id }) => {
          const marker = new maplibregl.Marker({ color: 'green' })
            .setLngLat(coordinates)
            .addTo(map);

          marker.getElement().addEventListener('click', () => {
            window.ReactNativeWebView.postMessage(id);
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingrese zona de interés"
          style={styles.textInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Buscar" onPress={() => setMapCenter([-77.0681, -11.9159])} />
      </View>

      {/* Mapa con WebView */}
      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onMessage={(event) => openModalWithInfo(event.nativeEvent.data)}
        />
      </View>

      {/* Modal para mostrar las imágenes e información */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Información del Lugar</Text>

          {/* Contenedor de Imágenes en Vertical */}
          <ScrollView contentContainerStyle={styles.imagesContainer}>
            {selectedInfo.images.map((imageUri, index) => (
              <Image key={index} source={{ uri: imageUri }} style={styles.modalImage} />
            ))}
          </ScrollView>

          {/* Información de Contaminación y Plástico */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Nivel de Contaminación: {selectedInfo.contaminationLevel}</Text>
            <Text style={styles.infoText}>Nivel de Plástico: {selectedInfo.plasticLevel}</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 250, // Aumentamos el tamaño de la imagen para mejor visualización
    height: 250,
    marginVertical: 10,
    borderRadius: 8,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#70B7C7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
