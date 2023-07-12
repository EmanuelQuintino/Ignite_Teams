import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleNavigateGroups() {
    navigation.navigate("groups");
  };

  return (
    <Container>
      {showBackButton &&
        <BackButton onPress={handleNavigateGroups}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  )
};