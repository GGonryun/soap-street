import type { Meta } from "@storybook/react";
import { ProductCard } from "./product-card";
import { Box, Button, Typography } from "@mui/material";
import { SubmissionButton } from "../buttons/submission-button";

const Story: Meta<typeof ProductCard> = {
  component: ProductCard,
  title: "Cards/ProductCard",
  decorators: [
    (Story) => (
      <Box width="250px">
        <Story />
      </Box>
    ),
  ],
};
export default Story;

export const Seller = {
  args: {
    id: "1",
    name: "Super Soaper",
    description:
      "A super soap: Extra organical and powered by blue. Buy at your own risk.",
    price: 9.99,
    quantity: 10,
    imageUrl:
      "https://9u5sq01tduqtq9hy.public.blob.vercel-storage.com/Background-G3wN2RJ3SAlCxSWxAfJ9kPWwezfali.png",
    children: <SubmissionButton>Edit</SubmissionButton>,
  },
};

export const Buyer = {
  args: {
    id: "1",
    name: "Super Soaper",
    description:
      "A super soap: Extra organical and powered by blue. Buy at your own risk.",
    price: 9.99,
    quantity: 10,
    imageUrl:
      "https://9u5sq01tduqtq9hy.public.blob.vercel-storage.com/Background-G3wN2RJ3SAlCxSWxAfJ9kPWwezfali.png",
    children: (
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="caption">
          Sold By: <u>miguel@reebelo.com</u>
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{
            alignSelf: "flex-end",
          }}
        >
          Add to cart
        </Button>
      </Box>
    ),
  },
};

export const NoQuantity = {
  args: {
    id: "1",
    name: "Super Soaper",
    description:
      "A super soap: Extra organical and powered by blue. Buy at your own risk.",
    price: 9.99,
    quantity: 0,
    imageUrl:
      "https://9u5sq01tduqtq9hy.public.blob.vercel-storage.com/Background-G3wN2RJ3SAlCxSWxAfJ9kPWwezfali.png",
    children: (
      <Button
        size="small"
        variant="contained"
        disabled
        sx={{
          alignSelf: "flex-end",
        }}
      >
        Out of Stock
      </Button>
    ),
  },
};
