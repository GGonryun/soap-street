import { publicProcedure } from "@/trpc/server/trpc";
import {
  createUserFormSchema,
  createdUserResponseSchema,
} from "@/types/create-user-form";

export default publicProcedure
  .input(createUserFormSchema)
  .output(createdUserResponseSchema)
  .mutation(async ({ input: { email, password, role }, ctx: { db } }) => {
    const user = await db.user.create({
      data: {
        email,
        // TODO: support encrypted passwords
        password,
        role,
      },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  });
