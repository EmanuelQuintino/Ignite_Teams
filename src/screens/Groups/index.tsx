import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from '@storage/group/groupGetAll';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      const dataGroups = await groupGetAll();
      setGourps(dataGroups);
    } catch (error) {
      Alert.alert("Turmas", "Não foi possuível carregar as turmas");
      console.error(error);
    } finally {
      setIsLoading(false);
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

      {isLoading ? <Loading/> : 
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
      }

      <Button title='Criar nova turma' onPress={handleNavigateNewGroup} />
    </Container>
  );
};
