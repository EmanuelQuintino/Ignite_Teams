import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';

export function Groups() {
  return (
    <Container>
      <Header showBackButton={false} />
      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />
    </Container>
  );
};
