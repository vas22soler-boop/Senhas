import { Stack } from 'expo-router';
import { AppProvider } from '../lib/store';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}
