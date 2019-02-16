#!/usr/bin/env bash

# Setting up the front env.
cd front
bash before.sh
npm run start-dev &

while ! nc -z localhost 8080; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

cd -

echo "Front is running"

cd server
bash before.sh
npm run dev &

while ! nc -z localhost 3000; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

cd -

echo "Server is running"

