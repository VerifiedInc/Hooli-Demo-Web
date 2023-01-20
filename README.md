# Remix MUI Knex Starter

Learn more about [Remix Stacks](https://remix.run/stacks).

Because this stack is hosted as a private repo, you'll need a [Github Token](https://github.com/settings/tokens/new?description=Remix%20Private%20Stack%20Access&scopes=repo) to use it.

```
npx create-remix@latest --template unumid/remix-mui-knex-starter --token GITHUB_TOKEN
```

## What's in the stack

- [TypeScript](https://typescriptlang.org).
- UI with [MUI](https://mui.com).
- Database (postgres) connection with [Knex](https://knexjs.org).
- Basic user model
- Basic user session functionality
- Basic login and register routes
- Example route requiring authentication
- Linting with [ESLint](https://eslint.org).
- Code formatting with [Prettier](https://prettier.io), enforced with a precommit hook.
- Unit testing with [jest](https://jestjs/io) and [testing-library](https://testing-library.com).
- CI/CD with [CircleCI](https://circleci.com) and [Docker](https://docker.com).
- Logging + Observability with [Winston](https://github.com/winstonjs/winston), [New Relic](https://newrelic.com), and [LogRocket](https://logrocket.com).
- Lato and Playfair Display fonts from Google Fonts.
- Basic CSP setup.

## Remix

- [Remix Docs](https://remix.run/docs)

### Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

### Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

#### DIY

If you're familiar with deploying express applications you should be right at home just make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

#### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
