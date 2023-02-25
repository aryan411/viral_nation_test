import { ButtonVariant } from "../../../models/enums";
import { ICustomStyles } from "../../../models/interfaces/styles";
import { viralButtonType } from "../../../setup/customStyles";

export const defaultStyles = {
  display: "flex",
  alignItems: "center",
  padding: "30px",
  height: "58px",
  background: "#272829",
  borderRadius: "16px",
};

export const buttonStylesFactory = (
  gButtonType: string,
  variant: string,
  size: string
) => {
  const getOutlinedStyles = (color: ICustomStyles) => ({
    background: "white",
    border: `1px solid ${color.default}`,
    color: color.default,
    "&:hover": {
      background: color.hover,
      color: "white",
    },
  });

  const getContainedStyles = (color: ICustomStyles) => ({
    background: color.default,
    border: "unset",
    color: "white",
    "&:hover": {
      background: color.hover,
    },
  });

  let buttonStyle = {};

  if (variant === ButtonVariant.outlined) {
    buttonStyle = getOutlinedStyles(viralButtonType[gButtonType][variant]);
  } else {
    buttonStyle = getContainedStyles(
        viralButtonType[gButtonType][ButtonVariant.contained]
    );
  }

  if (size === "small") {
    buttonStyle = {
      ...buttonStyle,
      height: "38px",
      padding: "8.5px 30px",
      borderRadius: "100px",
    };
  }
  return buttonStyle;
};
