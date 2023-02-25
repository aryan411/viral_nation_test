import React from "react";
import { Card as CardMui, CardContent } from "@mui/material";
import { customCardStyles } from "../../../setup/customStyles";

interface ICustomStyles {
  [key: string]: string | number;
}

interface ICardProps {
  children?: React.ReactNode;
  styles?: ICustomStyles | {};
  bg?: boolean;
  variant?: "elevation" | "outlined" | undefined;
}

export const Card: React.FunctionComponent<ICardProps> = ({
  bg = false,
  children,
  styles,
  variant,
}) => {
  const cardContainerStyle = customCardStyles.getCardContainerStyle({ bg });
  return (
    <CardMui variant={variant} sx={{ ...cardContainerStyle, ...styles }}>
      <CardContent sx={customCardStyles.defaultCardContent}>
        {children}
      </CardContent>
    </CardMui>
  );
};
