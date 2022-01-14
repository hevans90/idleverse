# Idleverse Monorepo

**Prerequisites:**

- [docker](https://docs.docker.com/get-docker/)
- [docker compose](https://docs.docker.com/compose/install/)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (and run `nvm use` at the root)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

Once done with prereqs, run a `yarn` at the root to bootstrap your environment.

After all of this, talk to one of the code owners about setting up your .env files. Various secrets are required to develop the application against our various cloud services. You will need `.env` and `.env.idleverse`.

---

## Running against production

`nx serve web` will serve the client against prod.

---

## Running locally using Docker

Ensure you have created a `.env.idleverse` at the root with the following variables (talk to a code owner for values):

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

1. `yarn docker-up:idleverse` will build and bring up the `idleverse` stack.
2. `yarn hasura:idleverse` will apply all the Hasura metadata & migrations

Now you can decide what you want to work on:

| App         | Command                    | Result                                                                                                |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Client      | `nx serve web -c docker`   | Serves at <http://localhost:4200>                                                                     |
| Game Server | `nx run game-server:watch` | Will restart the `idleverse-game-server` docker container when code changes in `apps/game-server/src` |
| Hasura      | `yarn console:idleverse`   | Runs the Hasura console at <http://localhost:9695/>                                                   |
