//in middleware.js/ts under app/
// without a defined matcher, this one line applies next-auth to the entire project
export { default } from 'next-auth/middleware';

//applies next-auth only to matching routes -  can be regex
// https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/restricted', '/vip/:path*'] };
