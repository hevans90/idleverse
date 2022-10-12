export default ({ env }) => ({
  // connection: {
  //   client: 'sqlite',
  //   connection: {
  //     filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
  //   },
  //   useNullAsDefault: true,
  // },
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'strapi-postgres'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {},
    },
  },
});
