import { Container, Form } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';

export function Players() {
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

      <Filter title="Time A" isActive />
    </Container>
  );
};
