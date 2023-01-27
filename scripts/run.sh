#!/usr/bin/env sh

ENV="${1:-"production"}"

if docker compose version; then
    DC="docker compose"
else
    DC="$HOME/.docker/cli-plugins/docker-compose"
fi

start() {
  $DC -f "docker-compose.$ENV.yml" up
}

stop() {
  $DC -f "docker-compose.$ENV.yml" down
  exit
}

trap stop 0 1 INT QUIT ILL ABRT TERM
start
