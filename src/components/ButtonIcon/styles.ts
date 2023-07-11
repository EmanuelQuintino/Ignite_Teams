import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export type ButtonIconTypeStyleProps = "ADD" | "DELETE";

type Props = {
  type: ButtonIconTypeStyleProps;
};

export const Container = styled(TouchableOpacity)`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "ADD" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
}))``;

