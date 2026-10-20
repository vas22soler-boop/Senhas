import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Account = {
  id: string;
  site: string;
  image?: string;
  username: string;
  password: string;
};

export type Profile = { name: string; email: string };
type AccountData = Omit<Account, 'id'>;

const DEFAULT_PASSWORD = '1234';
const K = {
  pass: 'app_password',
  profile: 'profile',
  accounts: 'accounts',
};

async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Falha ao ler ${key}.`, error);
    return fallback;
  }
}

async function writeJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Falha ao gravar ${key}.`, error);
  }
}

type Store = {
  storageReady: boolean;
  authenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changeAppPassword: (current: string, next: string) => Promise<boolean>;
  accounts: Account[];
  addAccount: (d: AccountData) => Promise<void>;
  updateAccount: (id: string, d: AccountData) => Promise<void>;
  removeAccount: (id: string) => Promise<void>;
  profile: Profile;
  updateProfile: (p: Profile) => Promise<void>;
};

const AppContext = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [storageReady, setStorageReady] = useState(false);
  const [appPassword, setAppPassword] = useState(DEFAULT_PASSWORD);
  const [authenticated, setAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [pass, loadedProfile, loadedAccounts] = await Promise.all([
          AsyncStorage.getItem(K.pass),
          readJSON<Profile>(K.profile, { name: '', email: '' }),
          readJSON<Account[]>(K.accounts, []),
        ]);

        if (!mounted) return;

        if (pass) setAppPassword(pass);
        setProfile(loadedProfile);
        setAccounts(loadedAccounts);
      } catch (error) {
        console.warn('Falha ao carregar os dados iniciais.', error);
      } finally {
        if (mounted) setStorageReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const saveAccounts = async (list: Account[]) => {
    await writeJSON(K.accounts, list);
    setAccounts(list);
  };

  const store: Store = {
    storageReady,
    authenticated,
    login: (password) => {
      const ok = password === appPassword;
      if (ok) setAuthenticated(true);
      return ok;
    },
    logout: () => setAuthenticated(false),
    changeAppPassword: async (current, next) => {
      if (current !== appPassword || next.length < 4) return false;

      try {
        await AsyncStorage.setItem(K.pass, next);
        setAppPassword(next);
        return true;
      } catch (error) {
        console.warn('Falha ao alterar a senha de acesso.', error);
        return false;
      }
    },
    accounts,
    addAccount: async (data) => {
      const acc: Account = { ...data, id: Date.now().toString() };
      await saveAccounts([...accounts, acc]);
    },
    updateAccount: async (id, data) => {
      const list = accounts.map((account) =>
        account.id === id ? { ...data, id } : account
      );
      await saveAccounts(list);
    },
    removeAccount: async (id) => {
      await saveAccounts(accounts.filter((account) => account.id !== id));
    },
    profile,
    updateProfile: async (p) => {
      await writeJSON(K.profile, p);
      setProfile(p);
    },
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
