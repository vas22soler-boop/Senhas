import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles } from '../lib/styles';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Ionicons name="shield-checkmark" size={90} color={colors.white} />
      <Text style={styles.title}>Meu Cofre</Text>
      <Text style={styles.subtitle}>
        Guarde e consulte suas senhas em um só lugar.
      </Text>
      <Pressable style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
  },
  title: {
    ...commonStyles.title,
    color: colors.white,
    marginTop: 16,
  },
  subtitle: {
    color: colors.welcomeText,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    ...commonStyles.button,
    backgroundColor: colors.white,
    width: '100%',
    marginTop: 40,
  },
  buttonText: {
    ...commonStyles.buttonText,
    color: colors.primaryDark,
  },
});
