This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install all dependencies `npm i`
2. Create a new project on Vercel: https://vercel.com/new. 
   1. Create a PostgresQL database on Vercel and attach it to your project.
   2. Create a Vercel Blob Storage instance on Vercel and attach it to your project.
3. Log into vercel on your local environment `vercel login <email>`
4. Pull your configuration from vercel: `vercel env pull .env`
5. Generate the prisma schema: `npm run prisma:generate`
6. Push your prisma schema to the database: `npm run prisma:push`
7. Run the development server: `npm run start`
8. (optional) Start the storybook server: `npm run storybook`
9. (optional) Start the prisma studio server: `npm run prisma:studio`

### Testing

1. Log in as one of the three available users. The password for all three users is `1234`.
   1. The buyer is `buyer@example.com`
   2. The first seller is `seller1@example.com`
   3. The second seller is `seller2@example.com`
2. Use the seller accounts to create new listings and view pending orders.
   1. Seller's can mark orders as shipped from the pending orders page.
3. Use the buyer account to add listings to your cart and complete checkout.

### User Stories

1. As a user, I want to be able to create an account
2. As a user, I want to be able to login to my account
3. As a user, I want to be able to logout of my account
4. As a seller, I want to be able to create a listing
5. As a seller, I want to be able to edit a listing
6. As a seller, I want to be able to delete a listing
7. As a user, I want to be able to view a seller's profile
8. As a user, I want to be able to view a listings details
9. As a buyer, I want to be able to view a listing
10. As a buyer, I want to be able to add a listing to my cart
11. As a buyer, I want to be able to remove a listing from my cart
12. As a buyer, I want to complete checkout
13. As a buyer, I want to be able to view my orders
14. As a seller, I want to be able to view pending orders
15. As a seller, I want to be able to mark an order as shipped

--- Progress ---

Stretch Goals:

1. As the system, provide a webhook to automatically mark an order as shipped
2. As a user, I want to be able to search for listings
3. As a user, I want to be able to filter listings
4. As a user, I want to be able to review a product
5. As a user, I want to be able to add a product to my wishlist
6. As a user, I want to fill out a checkout form with my address and payment information

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
- Keyboard Shortcuts
- Form Validation
