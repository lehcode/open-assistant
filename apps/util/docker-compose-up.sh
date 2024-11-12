#!/usr/bin/env bash

set -e

cd ../
docker compose -f docker-compose.yml -f docker-compose.ui.yml -f docker-compose.networks.yml up --remove-orphans
