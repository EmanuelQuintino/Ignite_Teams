import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

export function NewGroup() {
  const [groups, setGourps] = useState<string[]>([]);
  return (
    <Container>
      <Header showBackButton={true} />

      <Content>
        <Icon />

        <Highlight
          title='Nova Turma'
          subtitle='Crie uma turma para adicionar pessoas'
        />

        <Button title='Criar' />
      </Content>
    </Container>
  );
};
