import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginProps {
  onNavigate: () => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigate}>
        <Text style={styles.text}>
          ¿No tienes cuenta? <Text style={{ color: '#4CAF50' }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { width: 300, padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 5, backgroundColor: '#FFF' },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16 },
  text: { marginTop: 10, color: '#555' },
});

export default Login;
