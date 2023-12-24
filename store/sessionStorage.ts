import AsyncStorage from '@react-native-async-storage/async-storage';

enum AsyncStorageKey {
  session = 'session',
}

type Session = {
  idToken: string;
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

  public setSession(session: Session) {
    try {
      const dataString = JSON.stringify(session);
      AsyncStorage.setItem(AsyncStorageKey.session, dataString);
    } catch (error) {
      console.error('AppAsyncStorage: stringify error', error);
    }
  }

  public removeSession() {
    AsyncStorage.removeItem(AsyncStorageKey.session);
  }
}
