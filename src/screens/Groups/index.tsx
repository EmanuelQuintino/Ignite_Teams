import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useNavigation } from "@react-navigation/native";

export function Groups() {
  const [groups, setGourps] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNavigateNewGroup() {
    navigation.navigate("newGroup")
  };

  return (
    <Container>
      <Header showBackButton={false} />

      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => { }} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title='Criar nova turma' onPress={handleNavigateNewGroup} />
    </Container>
  );
};
