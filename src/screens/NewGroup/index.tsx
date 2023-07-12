import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [groups, setGourps] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNavigatePlayers() {
    navigation.navigate("players", { group: "Teruma" });
  };

  function handleNavigateGroup() {
    navigation.navigate("groups");
  };

  return (
    <Container>
      <Header showBackButton={true} />

      <Content>
        <Icon />

        <Highlight
          title='Nova Turma'
          subtitle='Crie uma turma para adicionar pessoas'
        />

        <Input
          placeholder='Nome da turma'
        />

        <Button
          title='Criar'
          style={{ marginTop: 24 }}
          onPress={handleNavigatePlayers}
        />
      </Content>
    </Container>
  );
};
