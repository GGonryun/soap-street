import { Box, Divider, Link, Typography, styled } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { getCurrentYear } from "@/util/time";

export default function Home() {
  return (
    <>
      <Layout
        title="Soap Street"
        description="Bubbles, Barter, Bliss - Where soap dreams come true, and cleanliness is currency"
      >
        <Typography variant="h5">Products</Typography>
        <Divider />
        <Box display="flex" flexGrow={1} justifyContent="space-between">
          <CaptionText>
            <Link href="/register">Sign Up</Link>
          </CaptionText>
          <CaptionText>© {getCurrentYear()} Soap Street</CaptionText>
        </Box>
      </Layout>
    </>
  );
}

const CaptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
}));
