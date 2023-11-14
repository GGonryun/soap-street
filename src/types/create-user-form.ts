import { z } from "zod";

export const createUserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.union([z.literal("SELLER"), z.literal("BUYER")]),
});

export const createdUserResponseSchema = createUserFormSchema
  .omit({
    password: true,
  })
  .merge(
    z.object({
      id: z.string(),
    })
  );

export type CreateUserForm = z.infer<typeof createUserFormSchema>;
export type CreatedUserResponse = z.infer<typeof createdUserResponseSchema>;
