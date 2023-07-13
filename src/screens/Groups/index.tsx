import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from '@storage/group/groupGetAll';

export function Groups() {
  const [groups, setGourps] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNavigateNewGroup() {
    navigation.navigate("newGroup")
  };

  function handleNavigatePlayers(group: string) {
    navigation.navigate("players", { group });
  };

  async function fetchGroups() {
    try {
      const dataGroups = await groupGetAll();
      setGourps(dataGroups);
    } catch (error) {
      console.error(error);
    };
  };

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

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
          <GroupCard 
            title={item} 
            onPress={() => handleNavigatePlayers(item)} 
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title='Criar nova turma' onPress={handleNavigateNewGroup} />
    </Container>
  );
};
