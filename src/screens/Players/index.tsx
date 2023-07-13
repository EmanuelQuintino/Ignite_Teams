import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useRoute } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playersGetByGroup } from '@storage/players/playersGetByGroup';

type RouteParams = {
  group: string;
}

export function Players() {
  const [teamActive, setTeamActive] = useState("Time A");
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const { group } = route.params as RouteParams;

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
      console.log(await playersGetByGroup(group));
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Jogador", error.message);
      } else {
        Alert.alert("Novo Jogador", "Não foi possível adicionar jogador");
        console.error(error);
      };
    };
  };

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
          onChangeText={setNewPlayerName}
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

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => { }} />
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

      <Button
        title="Remover Time"
        type="SECONDARY"
      />
    </Container>
  );
};
