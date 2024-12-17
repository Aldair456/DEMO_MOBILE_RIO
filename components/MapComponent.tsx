import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

interface MapComponentProps {
  latitude: number; // Latitud del mapa
  longitude: number; // Longitud del mapa
  zoomLevel?: number; // Nivel de zoom opcional
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  zoomLevel = 12, // Valor por defecto si no se pasa
}) => {
  return (
    <View style={styles.container}>
      {/* Mapa principal */}
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        {/* Configuración de la cámara */}
        <MapboxGL.Camera
          zoomLevel={zoomLevel}
          centerCoordinate={[longitude, latitude]}
        />

        {/* Marcador en la ubicación */}
        <MapboxGL.PointAnnotation id="marker" coordinate={[longitude, latitude]}>
          <View style={styles.marker} />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default MapComponent;
