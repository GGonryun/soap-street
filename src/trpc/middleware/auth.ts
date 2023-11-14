import { TRPCError } from '@trpc/server';
import { middleware } from '../server/trpc';

export const auth = middleware(({ next, ctx, type, path }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }

  return next({
    ctx: {
      user: ctx.session.user,
    },
  });
});
