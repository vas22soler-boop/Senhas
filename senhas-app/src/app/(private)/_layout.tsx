import { Redirect, Stack } from 'expo-router';
import { useApp } from '../../lib/store';

export default function PrivateLayout() {
  const { authenticated } = useApp();
  if (!authenticated) return <Redirect href="/login" />;
  return <Stack />;
}
