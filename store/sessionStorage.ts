import AsyncStorage from '@react-native-async-storage/async-storage';

enum AsyncStorageKey {
  session = 'session',
}

export type Session = {
  idToken: string;
  refreshToken: string;
  // ms
  expiresIn: number;
  loginTs: number;
  uid: string;
};

export class SessionStorage {
  private static self?: SessionStorage;

  public static get(): SessionStorage {
    if (!SessionStorage.self) {
      SessionStorage.self = new SessionStorage();
    }

    return SessionStorage.self;
  }

  public async getSession(): Promise<Session | null> {
    const data = await AsyncStorage.getItem(AsyncStorageKey.session);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('AppAsyncStorage: parse error', error);
      return null;
    }
  }

  public async setSession(session: Session): Promise<void | null> {
    try {
      const dataString = JSON.stringify(session);
      return AsyncStorage.setItem(AsyncStorageKey.session, dataString);
    } catch (error) {
      console.error('AppAsyncStorage: stringify error', error);
      return null;
    }
  }

  public removeSession() {
    return AsyncStorage.removeItem(AsyncStorageKey.session);
  }
}
