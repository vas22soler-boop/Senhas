import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles } from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Home() {
  const router = useRouter();
  const { accounts } = useApp();

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: 'Minhas contas',
          headerBackVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={30} color={colors.primary} />
            </Pressable>
          ),
        }}
      />

      <FlatList
        data={accounts}
        keyExtractor={(account) => account.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma conta cadastrada ainda.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/account/${item.id}`)}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="globe-outline" size={24} color="#6b7280" />
              </View>
            )}

            <View style={styles.accountInfo}>
              <Text style={styles.site}>{item.site}</Text>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.hiddenPassword}>••••••••</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.subtle} />
          </Pressable>
        )}
      />

      <Pressable style={commonStyles.button} onPress={() => router.push('/account/form')}>
        <Text style={commonStyles.buttonText}>+ Nova conta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 40,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
    backgroundColor: colors.avatar,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
  },
  site: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    color: colors.muted,
  },
  hiddenPassword: {
    color: colors.subtle,
    letterSpacing: 2,
  },
});
