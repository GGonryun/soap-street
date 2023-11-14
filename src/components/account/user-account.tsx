import { Box, Button, Typography, styled } from "@mui/material";
import { CreatedUserResponse } from "@/types/create-user-form";
import { FC } from "react";
import { SubmissionButton } from "../buttons/submission-button";
import { Logout } from "@mui/icons-material";

export const UserAccount: FC<{
  email: string;
  role: CreatedUserResponse["role"];
  onSignOut: () => void;
}> = ({ email, role, onSignOut }) => {
  return (
    <AccountBox>
      <Typography variant="h6">Account</Typography>
      <AccountFieldTypography>Logged in as: {email}</AccountFieldTypography>
      <AccountFieldTypography>Role: {role}</AccountFieldTypography>
      <SubmissionButton onClick={onSignOut} endIcon={<Logout />}>
        Log out
      </SubmissionButton>
    </AccountBox>
  );
};

const AccountBox = styled(Box)(({ theme }) => ({
  maxWidth: "300px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const AccountFieldTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
}));
