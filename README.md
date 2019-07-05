# Tracer UI

Source code to display data served from any RESTFul api source that currently complies to this [format](./mock-api/fixtures).



# Development and release process

The main script to build `development` and `production` artefacts is `./build.sh`. 

## Development process

1. Run `./build.sh dev mock` to get tracer-ui connect to a mock api
2. `./build.sh dev clean` to clean dev artefacts.
3. Modify the `./src` code accordingly and the process will hot reload changes.

## Release process
1. Run `./build.sh prod build` to build a production image.
2. Run `.buld.sh prod clean` to clean prod artefacts