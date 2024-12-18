import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxkYWlyMjMiLCJhIjoiY20zZzAycXhrMDFkODJscTJmMDF1cThpdyJ9.ov7ycdJg0xlYWpI6DykSdg';

type MarkerData = {
  lat: number;
  lng: number;
  contaminationLevel?: string;
  plasticLevel?: string;
  status?: string;
  images?: string[];
};

type MapComponentProps = {
  markerCoordinates?: MarkerData[];
};

const MapComponent: React.FC<MapComponentProps> = ({ markerCoordinates = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<MarkerData>({ lat: -12.0464, lng: -77.0428 });
  const [isLoading, setIsLoading] = useState(false);

  const safeMarkers = Array.isArray(markerCoordinates) ? markerCoordinates : [];

  useEffect(() => {
    if (safeMarkers.length > 0) {
      setLocation(safeMarkers[safeMarkers.length - 1]);
    }
  }, [markerCoordinates]);

  const searchLocation = async () => {
    if (!searchQuery) {
      Alert.alert('Error', 'Por favor ingresa una direccion para buscar.');
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
      } else {
        Alert.alert('No encontrado', 'No se pudo encontrar la direccion ingresada.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateHTML = (location: MarkerData, markers: MarkerData[]) => {
    const markersJS = markers
      .map((marker) => {
        const contamination = marker.contaminationLevel || 'Desconocido';
        const plastic = marker.plasticLevel || 'Desconocido';
        const status = marker.status || 'Desconocido';
        const imagesHTML = (marker.images || [])
          .map(img => `<img src="${img}" alt="Lugar" style="width:100%;border-radius:5px;margin-bottom:5px;"/>`)
          .join('');

        const popupHTML = `
          <div style="max-width:220px;font-family:sans-serif;">
            <h3 style="font-size:16px;margin:0 0 10px 0;text-align:center;">Informacion del Lugar</h3>
            <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
              ${imagesHTML}
            </div>
            <div style="background:#fff;border-radius:5px;padding:10px;box-shadow:0 2px 5px rgba(0,0,0,0.3);">
              <div style="margin-bottom:5px;font-size:14px;"><strong>Nivel de Contaminacion:</strong> ${contamination}</div>
              <div style="margin-bottom:5px;font-size:14px;"><strong>Nivel de Plastico:</strong> ${plastic}</div>
              <div style="margin-bottom:0;font-size:14px;"><strong>Estado:</strong> ${status}</div>
            </div>
          </div>
        `;

        return `
          {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(\`${popupHTML}\`);
            new mapboxgl.Marker({ color: 'green' })
              .setLngLat([${marker.lng}, ${marker.lat}])
              .setPopup(popup)
              .addTo(map);
          }
        `;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mapbox Map</title>
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
          <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
          <style>
            body, html { margin:0; padding:0; height:100%; }
            #map { position:absolute; top:0; bottom:0; width:100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
            const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [${location.lng}, ${location.lat}],
              zoom: 12
            });
            ${markersJS}
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar direccion..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
        />
        <Button title="Buscar" onPress={searchLocation} />
      </View>

      {isLoading && <ActivityIndicator size="large" color="#007AFF" />}

      <WebView
        originWhitelist={['*']}
        source={{ html: generateHTML(location, safeMarkers) }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    elevation: 2,
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
  webview: { flex: 1 },
});

export default MapComponent;
