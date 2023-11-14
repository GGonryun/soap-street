import { FC } from "react";
import { ConnectionSkeleton } from "./connection-skeleton";
import { ConnectUserForm } from "@/types/connect-user-form";
import { EmailInputField } from "../inputs/email-input-field";
import { PasswordInputField } from "../inputs/password-input-field";

export const LogInForm: FC<{
  onSubmit: () => void;
  onUpdate: (form: ConnectUserForm) => void;
  form: ConnectUserForm;
}> = ({ onSubmit, onUpdate, form }) => {
  const { email, password } = form;
  const setEmail = (email: string) => onUpdate({ ...form, email });
  const setPassword = (password: string) => onUpdate({ ...form, password });

  return (
    <ConnectionSkeleton
      onSubmit={onSubmit}
      subtitle={"Welcome back"}
      submissionText={"Sign In"}
    >
      <EmailInputField value={email} onUpdate={setEmail} />
      <PasswordInputField value={password} onUpdate={setPassword} />
    </ConnectionSkeleton>
  );
};
