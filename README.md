<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://logovectordl.com/wp-content/uploads/2020/11/argent-xyz-logo-vector.png" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Back-end service for the wallet retriever web-app</p>

## Description

This is the back-end service used by wallet retriever web-app.

When fetching its endpoing with a GET request followed by an Ethereum address, it retrieves the Eth. Balance, the number of Argent Guardians and Balance of its ERC20 tokens:
```bash
# GET Request
http://localhost:4000/<ethAddress>

# Response
{"address":"0x..","ethBalance":0.0,"numberOfGuardians":0,"ERC20Balances":[]}
```
This back-end uses NestJS TypeScript framework.

The service uses [ethers.js](https://docs.ethers.io/v5/) to:
- get the address Eth. balance
- interact with the guardians smart contract and the its number of guardians.

It uses [Moralis](https://docs.moralis.io/?utm_source=blog&utm_medium=post&utm_campaign=How%2520to%2520Get%2520NFT%2520and%2520ERC-20%2520Token%2520Balances%2520in%25203%2520Steps) to get the ERC20 token balances.

## Installation
```bash
$ npm install
```

## Set Up
#### 1. Make a copy of `.env.example` and name it `.env`.
   The service takes the env. variables defined on `./env` in the root directory.
```bash
$ cp .env.example .env
```
#### 2. Edit `.env` with the variables accordingly, where:
- #### INFURA_PROVIDER_URL
  The URL of the INFURA node provider. i.e.: https://mainnet.infura.io/v3/7d0d81d0919f4f05b9ab6634be01ee73
- #### MORALIS_API_KEY
  The api key for the Moralis provider. i.e.: d4tVTpoitCXKs5zB7KPS8JAzIxaurwLJeVd3yeqwOIhAYeqCs62ReSN2y5k1EUvw
- #### WALLET_PRIVATE_KEY
  Any Ethereum private key.
- #### MANAGE_GUARDIANS_SC_ADDRESS
  The SC address of ManageGuardians. i.e.: 0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7
- #### MANAGE_GUARDIANS_SC_ABI
  The ABI of above SC

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Steps to Run it Locally

#### 1. Install the libraries following [Installation](#installation)
#### 2. Set up the .env file following [Set Up](#set-up)
#### 3. Running the app
```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lint

```bash
# lint
$ npm run lint

# fix lint
$ npm run lint:fix
```

## Stay in touch

- Author - [Raul Castillo Lopez](https://www.linkedin.com/in/raulcastillolopez/)
