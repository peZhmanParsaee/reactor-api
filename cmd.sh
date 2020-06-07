#!/bin/bash

set -e

if [ "$ENV" = 'DEV' ]; then
  echo "Running Development Server"
  exec npm run dev
else
  echo "Running Production Server"
  exec npm start
fi
