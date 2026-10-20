import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f5f6fa',
  primary: '#2563eb',
  primaryDark: '#1e3a8a',
  white: '#ffffff',
  text: '#111111',
  muted: '#666666',
  subtle: '#999999',
  border: '#dddddd',
  avatar: '#e5e7eb',
  danger: '#dc2626',
  welcomeText: '#cbd5e1',
};

// Somente estilos realmente reutilizados entre várias telas.
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  error: {
    color: colors.danger,
    marginTop: 8,
  },
});
