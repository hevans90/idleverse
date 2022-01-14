# Nx Plugin - watch

ALL CREDIT GOES TO [THIS GUY](https://gist.github.com/jhesgodi/2d530753c551ace665a8c3010d3a719c)

Given a list of watched directories run given commands everytime there are changes.

## Options

- `@sources = string[]` List of directories to watch

- `@commands = string[]` List of tasks to execute everytime (ie. nx build)

### Install

Place plugin files under `./tools/executors/watch/`, and

#### Compile it

Must be compiled before use, or if changes are made to `impl.ts`.

```bash
npx tsc tools/executors/watch/impl
```

### Usage

Simply add a new task entry to `workspace.json` under the project's targets array.

The following task will re-build `my-app` and run a post-build script everytime there are changes to `apps/my-app/src`:

```json
// workspace.json

  "version": 2,
  //   ...
  "projects": {
      "my-app": {
        "targets": {
          "watch": {
            "executor": "./tools/executors/watch:watch",
            "options": {
              "sources": ["apps/my-app/src"],
              "commands": [
                "nx build my-app && some-post-build-script",
                "echo Successfully rebuilt my-app & ran some-post-build-script"
              ]
            }
          },
        },
        // ...
      },
    //   ...
  }
```

Can also be combined with other nx tasks, like serving `my-app` while watching for changes on the buildable dependency `my-server`:

```json
// workspace.json

  "version": 2,
  //   ...
  "projects": {
      "my-app": {
        "watch": {
            //   watch task ...
        },
        "serve": {
          "builder": "@nrwl/workspace:run-commands",
          "options": {
            "commands": [
              {
                "command": "nx watch my-server"
              },
              {
                "command": "nx serve my-app"
              }
            ]
          }
        },
      },
    //   ...
  }
```
