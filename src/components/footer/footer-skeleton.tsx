import { getCurrentYear } from "@/util/time";
import { Box } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { CaptionText } from "../typography/caption-text";

export const FooterSkeleton: FC<{
  href: string;
  text: string;
}> = ({ href, text }) => {
  return (
    <Box display="flex" flexGrow={1} justifyContent="space-between">
      <CaptionText>
        <Link href={href}>{text}</Link>
      </CaptionText>
      <CaptionText>© {getCurrentYear()} Soap Street</CaptionText>
    </Box>
  );
};
