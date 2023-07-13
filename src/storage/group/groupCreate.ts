import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(nameGroup: string) {
  try {
    const storageGroups = await groupGetAll();

    const isGroupAlreadyExist = storageGroups.includes(nameGroup);

    if (isGroupAlreadyExist) {
      throw new AppError("Já existe um grupo com esse nome");
    };

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storageGroups, nameGroup]));
  } catch (error) {
    throw (error);
  };
};