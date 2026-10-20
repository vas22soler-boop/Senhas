import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { commonStyles } from '../lib/styles';
import { useApp } from '../lib/store';

export default function Login() {
  const router = useRouter();
  const { login } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (login(password)) {
      router.replace('/home');
      return;
    }

    setError('Senha incorreta.');
  }

  return (
    <View style={styles.screen}>
      <Text style={commonStyles.title}>Digite sua senha</Text>
      <Text style={commonStyles.label}>Senha de acesso</Text>
      <TextInput
        style={commonStyles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        onSubmitEditing={handleLogin}
        autoFocus
      />
      {!!error && <Text style={commonStyles.error}>{error}</Text>}
      <Pressable style={commonStyles.button} onPress={handleLogin}>
        <Text style={commonStyles.buttonText}>Acessar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    justifyContent: 'center',
    padding: 20,
  },
});
