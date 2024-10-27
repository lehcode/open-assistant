#!/usr/bin/env bash

set -e
docker compose -f docker-compose.yml -f docker-compose.ui.yml -f docker-compose.networks.yml down --remove-orphans
