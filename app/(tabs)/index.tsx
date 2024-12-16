import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from '@/components/SplashScreen'; // Importa tu SplashScreen
import TopTabs from '@/components/TopTabs';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el Splash Screen

  useEffect(() => {
    // Simula una carga inicial de 3 segundos
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Cambia el tiempo según sea necesario
      setIsLoading(false); // Oculta el Splash Screen
    };

    loadApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Muestra el Splash Screen mientras se carga la app
  }

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
