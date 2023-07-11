import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { FlatList } from 'react-native';
import { useState } from 'react';

export function Players() {
  const [teamActive, setTeamActive] = useState("Time A");
  const [players, setPlayers] = useState([]);

  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title='Nome da turma'
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon icon="add" type="ADD" />
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
    </Container>
  );
};
