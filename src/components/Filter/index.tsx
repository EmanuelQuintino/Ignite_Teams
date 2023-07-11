
import { TouchableOpacityProps } from "react-native";
import { Container, Title, FilterTypeProps } from "./styles";

type Props = TouchableOpacityProps & FilterTypeProps & {
  title: string;
};

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container
      isActive={isActive}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
};