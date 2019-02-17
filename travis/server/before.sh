#!/usr/bin/env bash
# Setting up server.
cd server
npm i -g tslint typescript ts-node
npm i -D jest typescript
npm i -D ts-jest @types/jest
cp .env.travis .env
