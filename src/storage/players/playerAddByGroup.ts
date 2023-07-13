import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./playerStorageDTO";
import { AppError } from "@utils/appError";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, groupName: string) {
  try {
    const storagePlayers = await playersGetByGroup(groupName);

    const isPlayerAlreadyExist = storagePlayers.filter(player => player.name === newPlayer.name);

    if (isPlayerAlreadyExist.length > 0) {
      throw new AppError("Essa pessoa já está cadastrada no time");
    };

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${groupName}`, storage);
  } catch (error) {
    throw (error);
  };
};
