import { HowToReg } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  InputLabel,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FC, JSXElementConstructor, useState } from "react";

export const RegistrationForm: FC<{
  onSubmit: (email: string, password: string) => Promise<boolean>;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (await onSubmit(email, password)) {
      setEmail("");
      setPassword("");
    }
  };
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
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </InputBox>
      <InputBox>
        <DenseInputLabel htmlFor="password">Password</DenseInputLabel>
        <DenseTextField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </InputBox>
      <SubmissionButton onClick={handleSubmit}>Sign Up</SubmissionButton>
      <CaptionLink href="/">
        Nevermind, I&apos;d like to keep shopping as a guest
      </CaptionLink>
    </RegistrationBox>
  );
};

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
  gap: theme.spacing(2),
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

const SubmissionButton = styled<JSXElementConstructor<ButtonProps>>((props) => (
  <Button
    startIcon={<HowToReg />}
    fullWidth
    type="submit"
    variant="outlined"
    color="primary"
    {...props}
  />
))(({ theme }) => ({
  fontSize: "0.7rem",
  padding: theme.spacing(0.25),
  textTransform: "none",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));
