import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(groupName: string, teamName: string) {
  try {
    const storage = await playersGetByGroup(groupName); 
    const players = storage.filter(player => player.team === teamName);
    return players;
  } catch (error) {
    throw (error);
  };
};