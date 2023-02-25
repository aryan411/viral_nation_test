import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface IComboBoxProps {
  handleChange: (event: SelectChangeEvent<any>) => void;
  selectedValues: any;
  values: any;
  placeholder: any;
  onError?: (error: any) => void;
  error?: any;
  label?: string;
  name?: string;
  disabled?: boolean;
}
const inputStyles = {
  color: "black",
  backgroundColor: "white",
  border: "1px solid #CED4DA",
  borderRadius: "8px",
  minWidth: "196px",
  width: "100%",
  height: "38px",
  padding: "10px 15px",
  fontSize: "15px",
  fontFamily: "Mulish,Arial",
  // "&:hover": {
  //   border: `2px solid ${colorPalette.primary.main} !important`,
  // },
};

export const ComboBox: React.FunctionComponent<IComboBoxProps> = ({
  handleChange,
  selectedValues,
  values,
  placeholder,
  onError,
  error,
  label,
  name,
  disabled,
}) => {
  const handleBlur = (event: any) => {
    const { name, value } = event.target;

    console.log(!value.id);
    if (!value || !value.id) {
      onError && onError(name);
    } else {
      onError && onError(null);
    }
  };
  const renderValue = (selected: any) => {
    console.log("selected", selected);
    const selectedOption = values.find(
      (option: any) => option.id === selected.id,
    );
    console.log("selectedOption", selectedOption);

    return selectedOption
      ? `${selectedOption.firstName} ${selectedOption.lastName}`
      : "";
  };

  return (
    <Select
      disabled={disabled}
      id="select-platforms-feature-analytics"
      value={selectedValues}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      sx={inputStyles}
      renderValue={(selected) =>
        typeof values[0] == "object" ? renderValue(selected) : selected
      }
      label={label}
      error={error}
      name={name}
      onBlur={handleBlur}
    >
      <MenuItem disabled value={placeholder}>
        {placeholder}
      </MenuItem>
      {values && typeof values[0] == "object"
        ? values.map((object: any, index: number) => {
            return (
              <MenuItem value={object} key={index}>
                {`${object.firstName} ${object.lastName}`}
              </MenuItem>
            );
          })
        : values?.map((v: any, index: number) => (
            <MenuItem value={v} key={index}>
              {v}
            </MenuItem>
          ))}
    </Select>
  );
};
