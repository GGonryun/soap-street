import { getCurrentYear } from "@/util/time";
import { Box } from "@mui/material";
import Link from "next/link";
import { CaptionText } from "../typography/caption-text";
import { FooterSkeleton } from "./footer-skeleton";

export const RegistrationFooter = () => (
  <FooterSkeleton href="/register" text="Sign Up" />
);
