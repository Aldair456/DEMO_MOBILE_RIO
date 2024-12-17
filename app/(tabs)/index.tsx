import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from '@/components/SplashScreen'; // Importa tu SplashScreen
import AuthScreen from '@/components/AuthScreen'; // Importa AuthScreen
import TopTabs from '@/components/TopTabs'; // Contenido principal (después de autenticación)
//import MapboxGL from '@rnmapbox/maps';

// Configura tu token de acceso
//MapboxGL.setAccessToken('TU_MAPBOX_ACCESS_TOKEN');

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el Splash Screen
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [isVisitor, setIsVisitor] = useState(false); // Estado para la opción de visitante

  useEffect(() => {
    // Simula una carga inicial de 3 segundos
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Tiempo de carga
      setIsLoading(false); // Oculta el Splash Screen
    };

    loadApp();
  }, []);

  // 1. Splash Screen mientras carga la app
  if (isLoading) {
    return <SplashScreen />;
  }

  // 2. Pantalla de Autenticación si no está autenticado ni es visitante
  if (!isAuthenticated && !isVisitor) {
    return (
      <AuthScreen
        onLogin={() => setIsAuthenticated(true)} // Lógica cuando el usuario inicia sesión
        onRegister={() => setIsAuthenticated(true)} // Lógica cuando el usuario se registra
        onVisitor={() => setIsVisitor(true)} // Lógica para la opción de visitante
      />
    );
  }

  // 3. Contenido principal después de autenticación o como visitante
  return (
    <View style={{ flex: 1 }}>
      <TopTabs />
      <View style={styles.inputContainer}>
        {/* Aquí puedes añadir más contenido si lo necesitas */}
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
