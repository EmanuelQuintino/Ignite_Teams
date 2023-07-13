import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(nameGroup: string) {
  try {
    const storageGroups = await groupGetAll();
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storageGroups, nameGroup]));
  } catch (error) {
    throw (error);
  };
};