import { FC } from "react";
import { DenseInputLabel } from "./dense-input-label";
import { DenseTextField } from "./dense-text-field";
import { InputBox } from "./input-box";

export const PasswordInputField: FC<{
  value: string;
  onUpdate: (value: string) => void;
}> = ({ value, onUpdate }) => {
  return (
    <InputBox>
      <DenseInputLabel htmlFor="password">Password</DenseInputLabel>
      <DenseTextField
        id="password"
        type="password"
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </InputBox>
  );
};
