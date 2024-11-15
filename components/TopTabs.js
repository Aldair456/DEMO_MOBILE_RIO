import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ComoLlegarComponent from '@/components/ComoLlegar';
import CentrosAcopioComponent from '@/components/CentrosAcopioComponent';
import LugaresAfectadosComponent from '@/components/LugaresAfectadosComponent';

export default function TopTabs() {
  const [activeTab, setActiveTab] = useState('PuntosClaves'); // Estado para la pestaña activa

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'PuntosClaves' && styles.activeTab]}
          onPress={() => setActiveTab('PuntosClaves')}
        >
          <Text style={[styles.tabText, activeTab === 'PuntosClaves' && styles.activeTabText]}>
           Conocenos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'CentrosAcopio' && styles.activeTab]}
          onPress={() => setActiveTab('CentrosAcopio')}
        >
          <Text style={[styles.tabText, activeTab === 'CentrosAcopio' && styles.activeTabText]}>
            Centros de acopio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'LugaresAfectados' && styles.activeTab]}
          onPress={() => setActiveTab('LugaresAfectados')}
        >
          <Text style={[styles.tabText, activeTab === 'LugaresAfectados' && styles.activeTabText]}>
            Ver lugares afectados
          </Text>
        </TouchableOpacity>
      </View>

      {/* Renderizamos el componente correspondiente según la pestaña activa */}
      <View style={styles.contentArea}>
        {activeTab === 'PuntosClaves' && <ComoLlegarComponent />}
        {activeTab === 'CentrosAcopio' && <CentrosAcopioComponent />}
        {activeTab === 'LugaresAfectados' && <LugaresAfectadosComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#70B7C7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
});
