import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw (error);
  };
};