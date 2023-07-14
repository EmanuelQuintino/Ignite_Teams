import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/playerStorageDTO';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [teamActive, setTeamActive] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert("Novo Jogador", "Digite o nome do jogador");
      };

      const newPlayer = {
        name: newPlayerName,
        team: teamActive,
      };

      await playerAddByGroup(newPlayer, group);
      
      fetchPlayersByTeam();
      setNewPlayerName("");
      newPlayerNameInputRef.current?.blur();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Jogador", error.message);
      } else {
        Alert.alert("Novo Jogador", "Não foi possível adicionar jogador");
        console.error(error);
      };
    };
  };

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, teamActive);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert("Jogadores", "Não foi possível carregar jogadores");
      console.error(error);
    } finally {
      setIsLoading(false);
    };
  };

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover Jogador", "Não foi possível remover jogador");
      console.error(error);
    };
  };

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover Grupo", "Não foi possível remover grupo");
      console.error(error);
    };
  };

  async function handleRemoveGroup() {
    Alert.alert("Romover Grupo", `Deseja remover a turma ${group}?`, [
      {text: "Sim", onPress: () => removeGroup()},
      {text: "Não", style: "cancel"},
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  },[teamActive]);

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === teamActive}
              onPress={() => setTeamActive(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading/> :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item.name} 
              onRemove={() => handleRemovePlayer(item.name)} 
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList
              message="Não há jogadores nesse time"
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 24 },
          ]}
        />
      }
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
