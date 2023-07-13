import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./playerStorageDTO";

export async function playersGetByGroup(groupName: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}-${groupName}`);
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
    return players;
  } catch (error) {
    throw (error);
  };
};