import { Switch } from "@mui/material";

interface IToggleButton {
  onClick: (value: boolean) => void;
  checked: boolean;
  onLabel: string;
  offLabel: string;
}

export const ToggleButton: React.FunctionComponent<IToggleButton> = ({
  checked,
  onClick,
  onLabel,
  offLabel,
}) => {
  const handleToggle = () => {
    onClick(!checked);
  };

  return (
    <>
      <Switch checked={checked} onChange={handleToggle} />
      <span onClick={handleToggle}>{checked ? onLabel : offLabel}</span>
    </>
  );
};

