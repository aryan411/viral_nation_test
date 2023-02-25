import React, { MutableRefObject } from "react";
import { Button as ButtonMui } from "@mui/material";
import { buttonStylesFactory, defaultStyles } from "./style";
interface IButtonProps {
  onClick(e: any): void;
  label: string;
  styles?: any;
  variant: any;
  type: string;
  size?: string;
  icon?: React.ReactNode;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  ref?: MutableRefObject<null | React.ReactElement>;
  id?: string;
  ariaControls?: string | undefined;
  ariaHaspopup?: string;
  ariaExpanded?: string | undefined;
}

export const Button: React.FunctionComponent<IButtonProps> = ({
  onClick,
  label,
  styles,
  variant,
  type,
  size = "",
  iconStart,
  iconEnd,
  id,
}) => {
  const buttonStyles = {
    ...defaultStyles,
    ...buttonStylesFactory(type, variant, size),
  };

  return (
    <ButtonMui
      color="primary"
      onClick={(e) => onClick(e)}
      sx={{ ...buttonStyles, ...styles }}
      endIcon={iconEnd}
    >
      {iconStart}
      {label}
    </ButtonMui>
  );
};
