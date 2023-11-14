import { CreateUserForm } from "@/types/create-user-form";
import { HowToReg } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FC, JSXElementConstructor } from "react";
import { SubmissionButton } from "../buttons/submission-button";

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
    <RegistrationBox>
      <TitleBox>
        <TitleText variant="h6">The Soap Street</TitleText>
        <SubTitleText variant="body2">Create Your Account</SubTitleText>
      </TitleBox>
      <InputBox>
        <DenseInputLabel htmlFor="email">Email</DenseInputLabel>
        <DenseTextField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputBox>
      <InputBox>
        <DenseInputLabel htmlFor="password">Password</DenseInputLabel>
        <DenseTextField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputBox>
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
      <SubmissionButton startIcon={<HowToReg />} onClick={onSubmit}>
        Sign Up
      </SubmissionButton>
      <CaptionLink href="/">
        Nevermind, I&apos;d like to keep shopping as a guest
      </CaptionLink>
    </RegistrationBox>
  );
};

const DenseSelectField = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    fontSize: "0.7rem",
    padding: theme.spacing(0.5, 1),
  },
}));

const DenseMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "0.7rem",
}));

const DenseTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "0.7rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.7rem",
    padding: theme.spacing(0.5, 1),
  },
}));

const DenseInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: "bold",
}));

const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(0.5),
}));

const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(0.5),
}));

const RegistrationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  height: "100%",
  maxWidth: "400px",
}));

const TitleText = styled(Typography)(({ theme }) => ({
  letterSpacing: "0.3rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const SubTitleText = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
}));

const CaptionLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  "&:hover": {
    textDecoration: "underline",
    textDecorationColor: theme.palette.text.secondary,
  },
}));
