import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles } from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { accounts, removeAccount } = useApp();
  const [visible, setVisible] = useState(false);

  const account = accounts.find((item) => item.id === id);

  if (!account) {
    return <Text style={styles.notFound}>Conta não encontrada.</Text>;
  }

  function confirmDelete() {
    Alert.alert('Excluir conta', `Remover "${account.site}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removeAccount(account.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: account.site }} />

      {account.image && (
        <Image source={{ uri: account.image }} style={styles.accountImage} />
      )}

      <Text style={commonStyles.label}>Site</Text>
      <Text style={styles.value}>{account.site}</Text>

      <Text style={commonStyles.label}>Usuário / e-mail</Text>
      <Text style={styles.value}>{account.username}</Text>

      <Text style={commonStyles.label}>Senha</Text>
      <View style={commonStyles.row}>
        <Text style={styles.passwordValue}>
          {visible ? account.password : '••••••••'}
        </Text>
        <Pressable onPress={() => setVisible((value) => !value)} hitSlop={10}>
          <Ionicons
            name={visible ? 'eye-off' : 'eye'}
            size={26}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <Pressable
        style={commonStyles.button}
        onPress={() => router.push(`/account/form?id=${account.id}`)}
      >
        <Text style={commonStyles.buttonText}>Editar</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, commonStyles.dangerButton, styles.deleteButton]}
        onPress={confirmDelete}
      >
        <Text style={commonStyles.buttonText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    padding: 20,
  },
  notFound: {
    padding: 20,
  },
  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
  },
  value: {
    fontSize: 18,
  },
  passwordValue: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    marginTop: 10,
  },
});
