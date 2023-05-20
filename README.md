# Idleverse Monorepo

**Prerequisites:**

- [docker](https://docs.docker.com/get-docker/)
- [docker compose](https://docs.docker.com/compose/install/)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (and run `nvm use` at the root)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- nx: `yarn global add nx` (after which running `nx --version` should return >15.7.x)

- Apple silicon only: `brew install pkg-config cairo pango libpng jpeg giflib librsvg` (these are required to build `node-canvas` as there is no pre-built binary available for Apple Silicon processor architectures).

Once done with prereqs, run a `yarn` at the root to bootstrap your environment.

After all of this, talk to one of the code owners about setting up your .env files. Various secrets are required to develop the application against our various cloud services. You will need a `.env` at the root.

---

## Running against production

`nx serve idleverse-web` will serve the client against prod.

---

## Running locally using Docker

Ensure you have created a `.env` at the root with the following variables (talk to a code owner for values):

```bash
COMPOSE_PROJECT_NAME=idleverse
SECURE_HASURA=secure
AUTH0_DOMAIN=dev-uyer-vun.us.auth0.com
REMOTE_SCHEMA_URI=host.docker.internal

AUTH0_CLIENT_ID=<talk_to_owners>
AUTH0_MANAGEMENT_API_CLIENT_ID=<talk_to_owners>
AUTH0_MANAGEMENT_API_CLIENT_SECRET=<talk_to_owners>
```

Now:

1. `yarn prepare-watch` will build the game server and install deps (only need to run once)
2. `yarn docker-up` will build and bring up the `idleverse` stack. This includes everything except the client. For example the game-server will now be available on <http://localhost:4000/graphql>.
3. `yarn hasura` will apply all the Hasura metadata & migrations

Now you can decide what you want to work on:

| App         | Command                              | Result                                                                                |
| ----------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| Client      | `nx serve idleverse-web -c docker`   | Serves at <http://localhost:3000>                                                     |
| Game Server | `nx run idleverse-game-server:watch` | Watches `idleverse-game-server` container for code changes in `apps/game-server/src`. |
| Hasura      | `yarn console`                       | Runs the Hasura console at <http://localhost:9695/>                                   |
