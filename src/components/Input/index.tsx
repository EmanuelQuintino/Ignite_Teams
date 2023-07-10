import { useTheme } from "styled-components/native";
import { TextInputProps } from "react-native";
import { Container } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  const theme = useTheme();
  return (
    <Container
      placeholderTextColor={theme.COLORS.GRAY_300}
      {...rest}
    />
  )
};