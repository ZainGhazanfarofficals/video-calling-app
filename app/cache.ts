// app/cache.ts (or inline in _layout)
import * as SecureStore from "expo-secure-store";

export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (!item) {
        console.log(`No value stored under key: ${key}`);
        return null; // IMPORTANT: return null explicitly
      }
      // Optional: console.log(`${key} was used`);
      return item;    // IMPORTANT: return the token
    } catch (error) {
      console.error("SecureStore getItem error", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore setItem error", error);
    }
  },
  // (Optional) clear helper
  async deleteToken(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("SecureStore deleteItem error", error);
    }
  },
};
