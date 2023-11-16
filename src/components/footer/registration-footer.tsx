import { useSession } from "next-auth/react";
import { FooterSkeleton } from "./footer-skeleton";

export const RegistrationFooter = () => {
  // if the user is logged in, send them to their account instead.
  const session = useSession();
  if (session.data?.user != null) {
    return <FooterSkeleton href="/account" text="My account" />;
  }
  return <FooterSkeleton href="/register" text="Sign Up" />;
};
