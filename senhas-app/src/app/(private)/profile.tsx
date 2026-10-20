import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { commonStyles } from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Profile() {
  const router = useRouter();
  const { profile, updateProfile, changeAppPassword, logout } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  async function saveProfile() {
    await updateProfile({ name: name.trim(), email: email.trim() });
    Alert.alert('Pronto', 'Dados atualizados.');
  }

  async function savePassword() {
    if (next !== confirm) {
      Alert.alert('Atenção', 'A confirmação não confere.');
      return;
    }

    const changed = await changeAppPassword(current, next);

    if (!changed) {
      Alert.alert('Atenção', 'Senha atual incorreta ou nova senha com menos de 4 caracteres.');
      return;
    }

    setCurrent('');
    setNext('');
    setConfirm('');
    Alert.alert('Pronto', 'Senha de acesso alterada.');
  }

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Dados pessoais' }} />

      <Text style={commonStyles.label}>Nome</Text>
      <TextInput style={commonStyles.input} value={name} onChangeText={setName} />

      <Text style={commonStyles.label}>E-mail</Text>
      <TextInput
        style={commonStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Pressable style={commonStyles.button} onPress={saveProfile}>
        <Text style={commonStyles.buttonText}>Salvar dados</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Senha de acesso</Text>

      <Text style={commonStyles.label}>Senha atual</Text>
      <TextInput
        style={commonStyles.input}
        secureTextEntry
        value={current}
        onChangeText={setCurrent}
      />

      <Text style={commonStyles.label}>Nova senha</Text>
      <TextInput
        style={commonStyles.input}
        secureTextEntry
        value={next}
        onChangeText={setNext}
      />

      <Text style={commonStyles.label}>Confirmar nova senha</Text>
      <TextInput
        style={commonStyles.input}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <Pressable style={commonStyles.button} onPress={savePassword}>
        <Text style={commonStyles.buttonText}>Alterar senha</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, commonStyles.dangerButton, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={commonStyles.buttonText}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    ...commonStyles.title,
    fontSize: 20,
    marginTop: 32,
  },
  logoutButton: {
    marginBottom: 40,
  },
});
