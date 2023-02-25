import { TextField } from "@mui/material";

interface IInput {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (value: any) => void;
  type?: any;
  error: any;
  onError: (error: any) => void;
  helperText: any;
  multiline?: boolean;
}
export const Input: React.FunctionComponent<IInput> = ({
  label,
  name,
  value,
  onChange,
  type,
  error,
  helperText,
  onError,
  multiline,
}) => {
  const handleBlur = (event: any) => {
    const { name, value } = event.target;
    if (value.trim() === "") {
      onError(name);
    } else {
      onError(null);
    }
  };

  return (
    <TextField
      multiline={multiline}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      type={type}
      error={error}
      helperText={error ? helperText : ""}
    />
  );
};
