import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from '@storage/group/groupCreate';

export function NewGroup() {
  const [group, setGourp] = useState("");
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      console.error(error);
    };
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
          onChangeText={setGourp}
        />

        <Button
          title='Criar'
          style={{ marginTop: 24 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
};
