# Instructions to run the code;

## Requirements

- If you want to run the api container, you have to install **Docker** in your OS.
- If you want to run it locally, you need to install **node** v20.9.

## Run

### Container

- To run in the container option, you can execute the following instruction in your terminal `docker compose up`.

### Locally

- Run `npm install`;
- **Production mode:** you have to run `npm run build`, `npm run start:prod`;
- **Development mode**, you can run `npm run start` or even `npm run start:dev`;

## Tests

### Run

To run the tests you have to `npm install` all packages.

- If you want to run only unit tests you can run `npm run test:unit`;
- If you want to run only integration tests you can run `npm run test:integration`;
- If you want to run only e2e tests you can run `npm run test:e2e`;
- If you want to run all of them you can run `npm run test`.

# Main Technical Decisions;

# Relevant Comments About The Project

## Project Overview

This project is a Pro-Project matcher. It aims to verify for which project the Pro is most qualified for.
With that, we can automatize the proccess of deliverying projects to the pros and save a lot of time.

## Architecture

This project follows `Screaming Architecture` to make it more understandable and simpler to maintenance. It was built with Typescript language and NestJS framework.

## Contact information

If you have any questions or feedback, you can reach me at gabrielkist02@gmail.com or on my GitHub profile @kistgab.
