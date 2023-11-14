import { HowToReg } from "@mui/icons-material";
import { Box, Link, styled } from "@mui/material";
import { FC, ReactNode } from "react";
import { SubmissionButton } from "../buttons/submission-button";
import { SubtitleText } from "../typography/subtitle-text";
import { TitleText } from "../typography/title-text";

export const ConnectionSkeleton: FC<{
  onSubmit: () => void;
  children: ReactNode;
  subtitle: string;
  submissionText: string;
}> = ({ onSubmit, children, subtitle, submissionText }) => {
  return (
    <RegistrationBox>
      <TitleBox>
        <TitleText variant="h6">The Soap Street</TitleText>
        <SubtitleText variant="body2">{subtitle}</SubtitleText>
      </TitleBox>
      <>{children}</>
      <SubmissionButton startIcon={<HowToReg />} onClick={onSubmit}>
        {submissionText}
      </SubmissionButton>
      <CaptionLink href="/">
        Nevermind, I&apos;d like to keep shopping as a guest
      </CaptionLink>
    </RegistrationBox>
  );
};

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
