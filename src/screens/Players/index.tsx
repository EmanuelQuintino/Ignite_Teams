import { ButtonIcon } from '@components/ButtonIcon';
import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

export function Players() {
  return (
    <Container>
      <Header showBackButton={true} />

      <Highlight
        title='Nome da turma'
        subtitle='Adicione a galera e separe os times'
      />

      <ButtonIcon icon="add" type="ADD" />
    </Container>
  );
};
