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
2. Run `./build.sh prod clean` to clean prod artefacts


## Mocking production build locally
1. Run `docker login dev.catenasys.com:8083`
2. Run `./build.sh prod mock`
3. Start browser connecting to `localhost`