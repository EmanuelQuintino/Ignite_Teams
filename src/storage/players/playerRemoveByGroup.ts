import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, groupName: string) {
  try {
    const storagePlayers = await playersGetByGroup(groupName);
    
    const filtered = storagePlayers.filter(player => player.name !== playerName);
    const players = JSON.stringify(filtered);
    
    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${groupName}`, players);
  } catch (error) {
    throw (error);
  };
};
