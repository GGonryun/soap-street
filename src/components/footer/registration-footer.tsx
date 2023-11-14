import { getCurrentYear } from "@/util/time";
import { Box, Typography, styled } from "@mui/material";
import Link from "next/link";
import { CaptionText } from "../typography/caption-text";

export const RegistrationFooter = () => {
  return (
    <Box display="flex" flexGrow={1} justifyContent="space-between">
      <CaptionText>
        <Link href="/register">Sign Up</Link>
      </CaptionText>
      <CaptionText>© {getCurrentYear()} Soap Street</CaptionText>
    </Box>
  );
};
