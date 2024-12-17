import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxkYWlyMjMiLCJhIjoiY20zZzAycXhrMDFkODJscTJmMDF1cThpdyJ9.ov7ycdJg0xlYWpI6DykSdg';

const MapComponent = ({ markerCoordinates }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({ lat: -12.0464, lng: -77.0428 }); // Lima, Perú
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (markerCoordinates) {
      setLocation(markerCoordinates);
    }
  }, [markerCoordinates]);

  // Obtener sugerencias en tiempo real
  const fetchSuggestions = async (text) => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          text
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&proximity=-77.0428,-12.0464&bbox=-77.2,-12.2,-76.8,-11.9&autocomplete=true&limit=5`
      );
      const data = await response.json();

      const processedSuggestions = data.features.map((item) => {
        const district = item.context?.find((c) => c.id.includes('locality'))?.text || 'Distrito desconocido';
        return {
          id: item.id,
          name: item.place_name,
          district,
          center: item.center,
        };
      });

      setSuggestions(processedSuggestions);
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery) {
      Alert.alert('Error', 'Por favor ingresa una dirección para buscar.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLocation({ lat, lng });
        setSuggestions([]);
      } else {
        Alert.alert('No encontrado', 'No se pudo encontrar la dirección ingresada.');
      }
    } catch (error) {
      console.error('Error al buscar la ubicación:', error);
      Alert.alert('Error', 'Hubo un problema al buscar la ubicación.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectLocation = (item) => {
    const [lng, lat] = item.center;
    setLocation({ lat, lng });
    setSearchQuery(item.name);
    setSuggestions([]);
  };

  // HTML para el mapa
  const generateHTML = (lat, lng, marker) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mapbox Map</title>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [${lng}, ${lat}],
            zoom: 12
          });

          new mapboxgl.Marker()
            .setLngLat([${lng}, ${lat}])
            .setPopup(new mapboxgl.Popup().setHTML('<h3>Ubicación Seleccionada</h3>'))
            .addTo(map);

          ${marker ? `
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([${marker.lng}, ${marker.lat}])
              .setPopup(new mapboxgl.Popup().setHTML('<h3>Coordenadas Insertadas</h3>'))
              .addTo(map);
          ` : ''}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar dirección..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            fetchSuggestions(text);
          }}
        />
        <Button title="Buscar" onPress={searchLocation} />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => selectLocation(item)}>
              <Text style={styles.suggestionText}>{item.name}</Text>
              <Text style={styles.districtText}>Distrito: {item.district}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}

      {isLoading && <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />}

      <WebView
        originWhitelist={['*']}
        source={{ html: generateHTML(location.lat, location.lng, markerCoordinates) }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    elevation: 4,
    zIndex: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  suggestionsList: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 5,
    elevation: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: { fontSize: 16, fontWeight: 'bold' },
  districtText: { fontSize: 14, color: '#666' },
  loadingIndicator: { position: 'absolute', top: 100, alignSelf: 'center' },
  webview: { flex: 1 },
});

export default MapComponent;
