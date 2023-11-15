This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install all dependencies `npm i`
2. Create a PostgresQL database on Vercel
3. Pull your configuration from vercel: `vercel env pull .env`
4. Generate the prisma schema: `npm run prisma:generate`
5. Push your prisma schema to the database: `npm run prisma:push`
6. Run the development server: `npm run start`
7. (optional) Start the storybook server: `npm run storybook`
8. (optional) Start the prisma studio server: `npm run prisma:studio`

## Technologies

- Database: Prisma + PostgresQL
- Styling: Sass
- Authentication: NextAuth.js
- Deployment: Vercel
- Object Storage: Vercel Blob Storage
- Components: Material UI
- API: tRPC
- Frontend Workshop: Storybook.js

## What's missing?

- Unit Tests
- End-to-end Tests
- Continuous Integration/Deployment
- Realtime updates
- Mobile responsive design
- SEO
- Analytics
- Error reporting
- Logging
- Monitoring
- Caching
