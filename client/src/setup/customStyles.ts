import { colorPalette } from "./colorPalette";

/**Card **/
const getCardContainerStyle = ({ bg }: { bg: boolean }) => ({
  padding: "10px",
  borderRadius: "10px",
  border: bg ? "unset" : `1px solid ${colorPalette.grey[300]}`,
  backgroundColor: bg ? colorPalette.primary.main : "white",
});

const defaultCardContent = {
  padding: "0px",
  "&:last-child": { paddingBottom: "0px" },
};

export const customCardStyles = {
  getCardContainerStyle,
  defaultCardContent,
};

/** Button **/
const danger = {
  outlined: {
    default: "#DC3545",
    hover: "#C82333",
    focus: "#C82333",
  },
  contained: {
    default: "white",
    hover: "#DC3545",
  },
};

const primary = {
  outlined: {
    default: "#5900FE",
    hover: "#560FDB",
    focus: "#560FDB",
  },
  contained: {
    default: "#5900FE",
    hover: "#560FDB",
    focus: "#560FDB",
  },
};

const dark = {
  outlined: {
    default: "#343A40",
    hover: "#23272B",
    focus: "#23272B",
  },
  contained: {
    default: "white",
    hover: "#343A40",
  },
};

interface IViralButtonType {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const viralButtonType: IViralButtonType = {
  primary,
  danger,
  dark,
};
