import type { Meta } from "@storybook/react";
import { SubmissionButton } from "./submission-button";
import { SportsEsports } from "@mui/icons-material";

const Story: Meta<typeof SubmissionButton> = {
  component: SubmissionButton,
  title: "Buttons/SubmissionButton",
};
export default Story;

export const Primary = {
  args: {
    children: "Submit",
  },
};

export const WithIcon = {
  args: {
    startIcon: "👍",
    endIcon: <SportsEsports />,
    children: "Submission Button With Icons",
  },
};
