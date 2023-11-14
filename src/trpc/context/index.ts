import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import prisma from '../../prisma';
import { getToken } from 'next-auth/jwt';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const session = await getToken({ req });

  return {
    req,
    db: prisma,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
