import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterTypeProps = {
  isActive?: boolean;
};

export const Container = styled(TouchableOpacity) <FilterTypeProps>`
  border-radius: 4px;
  margin-right: 12px;
  height: 38px;
  width: 70px;
  align-items: center;
  justify-content: center;
  ${({ theme, isActive }) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_700};
  `};
`;

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `};
`;
