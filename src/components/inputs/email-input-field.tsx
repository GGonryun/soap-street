import { FC } from "react";
import { DenseInputLabel } from "./dense-input-label";
import { DenseTextField } from "./dense-text-field";
import { InputBox } from "./input-box";

export const EmailInputField: FC<{
  value: string;
  onUpdate: (value: string) => void;
}> = ({ value, onUpdate }) => {
  return (
    <InputBox>
      <DenseInputLabel htmlFor="email">Email</DenseInputLabel>
      <DenseTextField
        id="email"
        type="email"
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </InputBox>
  );
};
