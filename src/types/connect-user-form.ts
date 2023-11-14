import { z } from "zod";

export const connectUserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ConnectUserForm = z.infer<typeof connectUserFormSchema>;
