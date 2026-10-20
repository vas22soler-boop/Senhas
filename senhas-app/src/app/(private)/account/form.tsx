import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles } from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { accounts, addAccount, updateAccount } = useApp();
  const editing = accounts.find((account) => account.id === id);

  const [site, setSite] = useState(editing?.site ?? '');
  const [image, setImage] = useState(editing?.image);
  const [username, setUsername] = useState(editing?.username ?? '');
  const [password, setPassword] = useState(editing?.password ?? '');
  const [showPass, setShowPass] = useState(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function save() {
    if (!site.trim() || !username.trim() || !password) {
      Alert.alert('Atenção', 'Preencha site, usuário e senha.');
      return;
    }

    const data = {
      site: site.trim(),
      image,
      username: username.trim(),
      password,
    };

    if (editing) {
      await updateAccount(editing.id, data);
    } else {
      await addAccount(data);
    }

    router.back();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: editing ? 'Editar conta' : 'Nova conta' }} />

      <Pressable onPress={pickImage} style={styles.imageButton}>
        {image ? (
          <Image source={{ uri: image }} style={styles.accountImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera-outline" size={30} color="#6b7280" />
          </View>
        )}

        <Text style={styles.imageText}>
          {image ? 'Trocar imagem' : 'Adicionar imagem (opcional)'}
        </Text>
      </Pressable>

      <Text style={commonStyles.label}>Site</Text>
      <TextInput
        style={commonStyles.input}
        value={site}
        onChangeText={setSite}
        autoCapitalize="none"
        placeholder="ex.: github.com"
      />

      <Text style={commonStyles.label}>Usuário ou e-mail</Text>
      <TextInput
        style={commonStyles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={commonStyles.label}>Senha</Text>
      <View style={styles.passwordField}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          autoCapitalize="none"
        />
        <Pressable onPress={() => setShowPass((value) => !value)} hitSlop={10}>
          <Ionicons
            name={showPass ? 'eye-off' : 'eye'}
            size={24}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <Pressable style={commonStyles.button} onPress={save}>
        <Text style={commonStyles.buttonText}>
          {editing ? 'Salvar alterações' : 'Cadastrar'}
        </Text>
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
  },
  imageButton: {
    alignSelf: 'center',
  },
  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.avatar,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: 6,
  },
  passwordField: {
    ...commonStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
