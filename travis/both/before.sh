#!/usr/bin/env bash

# Setting up the front env.
pwd
cd front
npm i
npm run start-dev &

while ! nc -z localhost 8080; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

cd -

echo "Front is running"

cd server

npm i -g tslint typescript ts-node
npm i -D jest typescript
npm i -D ts-jest @types/jest
npm i
cp .env.travis .env

# Migrating stuff.
npm run cli migrate products
npm run cli migrate recipes

npm run dev &

while ! nc -z localhost 3000; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

cd -

echo "Server is running"
