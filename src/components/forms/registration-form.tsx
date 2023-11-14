import { CreateUserForm } from "@/types/create-user-form";
import { FC } from "react";
import { ConnectionSkeleton } from "./connection-skeleton";
import { DenseInputLabel } from "../inputs/dense-input-label";
import { DenseMenuItem } from "../inputs/dense-menu-item";
import { DenseSelectField } from "../inputs/dense-select-field";
import { InputBox } from "../inputs/input-box";
import { EmailInputField } from "../inputs/email-input-field";
import { PasswordInputField } from "../inputs/password-input-field";

export const RegistrationForm: FC<{
  onSubmit: () => void;
  onUpdate: (form: CreateUserForm) => void;
  form: CreateUserForm;
}> = ({ onSubmit, onUpdate, form }) => {
  const { email, password, role } = form;
  const setEmail = (email: string) => onUpdate({ ...form, email });
  const setPassword = (password: string) => onUpdate({ ...form, password });
  const setRole = (role: unknown) =>
    onUpdate({ ...form, role: role as "BUYER" | "SELLER" });

  return (
    <ConnectionSkeleton
      onSubmit={onSubmit}
      subtitle="Create your account"
      submissionText="Sign Up"
    >
      <EmailInputField value={email} onUpdate={setEmail} />
      <PasswordInputField value={password} onUpdate={setPassword} />
      <InputBox>
        <DenseInputLabel htmlFor="role">Role</DenseInputLabel>
        <DenseSelectField
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <DenseMenuItem dense value={"BUYER"}>
            Buyer
          </DenseMenuItem>
          <DenseMenuItem dense value={"SELLER"}>
            Seller
          </DenseMenuItem>
        </DenseSelectField>
      </InputBox>
    </ConnectionSkeleton>
  );
};
