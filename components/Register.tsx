import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface RegisterProps {
  onNavigate: () => void;
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Fondo decorativo con círculos */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      {/* Imagen encima del título */}
      <Image
        source={require('@/assets/images/register_imagen.png')} // Reemplaza con tu imagen
        style={styles.image}
      />

      {/* Título */}
      <Text style={styles.title}>Registrarse</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Nombre Completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />

      {/* Botón para registrarse */}
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      {/* Texto para navegar al inicio de sesión */}
      <TouchableOpacity onPress={onNavigate}>
        <Text style={styles.text}>
          ¿Ya tienes cuenta? <Text style={styles.textHighlight}>Inicia Sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLarge: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#4CAF50',
    top: -100,
    right: -100,
  },
  circleSmall: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4CAF50',
    bottom: -50,
    left: -50,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: 300,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 15,
    color: '#555',
    fontSize: 14,
  },
  textHighlight: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Register;
