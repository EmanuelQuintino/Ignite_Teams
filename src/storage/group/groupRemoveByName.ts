import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYERS_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(nameGroup: string) {
  try {
    const storageGroups = await groupGetAll();

    const filtered = storageGroups.filter(group => group !== nameGroup);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filtered));
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${nameGroup}`);
  } catch (error) {
    throw (error);
  };
};