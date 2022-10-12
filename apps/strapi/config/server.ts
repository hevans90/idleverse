export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f7fd190ce86e9bb83688397c29805df2'),
    },
  },
  // host: env('HOST', '0.0.0.0'),
  // port: env.int('PORT', 1337),
  // app: {
  //   keys: env.array('APP_KEYS'),
  // },
});
