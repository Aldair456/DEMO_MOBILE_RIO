import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ComoLlegarComponent from '@/components/ComoLlegar';
import CentrosAcopioComponent from '@/components/CentrosAcopioComponent';
import MapComponent from '@/components/MapComponent';
import InsertarCoordenadasComponent from '@/components/InsertarCoordenadasComponent';
import PerfilComponent from '@/components/PerfilComponent'; // Importa el componente de Perfil

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  // Estado compartido para almacenar múltiples coordenadas
  const [markerCoordinates, setMarkerCoordinates] = useState([]);

  // Función para agregar nuevas coordenadas al estado existente
  const handleInsertCoordinates = (newCoordinate) => {
    setMarkerCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#70B7C7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#f9f9f9',
          width: 240,
        },
        drawerActiveTintColor: '#70B7C7',
        drawerInactiveTintColor: 'gray',
      }}
    >
      {/* Pantallas del Drawer Navigator */}
      <Drawer.Screen name="Perfil" component={PerfilComponent} />
      <Drawer.Screen name="Conócenos" component={ComoLlegarComponent} />
      <Drawer.Screen name="Centros de Acopio" component={CentrosAcopioComponent} />
      <Drawer.Screen name="Lugares Afectados">
        {() => <MapComponent markerCoordinates={markerCoordinates} />}
      </Drawer.Screen>
      <Drawer.Screen name="Insertar Coordenadas">
        {() => (
          <InsertarCoordenadasComponent
            onInsert={(newCoordinate) => {
              handleInsertCoordinates(newCoordinate);
              console.log('Nueva coordenada:', newCoordinate);
            }}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
