import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGourp] = useState("");
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma")
      };

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar novo grupo");
        console.error(error);
      };
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
