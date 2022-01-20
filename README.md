# spike-orchestration-temporal

Orchestration with temporal.io, focus on project structure and testability

# Dev dependencies

## Temporalite

[temporalite](https://github.com/DataDog/temporalite): running local without the requirement of using docker

- Install golang
- Set your paths
  - export GOPATH=$HOME/go
  - export PATH=$PATH:$GOPATH/bin
- Install temporalite (build from source)
  - https://github.com/DataDog/temporalite
- Start temporalite
  - temporalite start --ephemeral
  - the web interface: http://localhost:8233.

> !!! Temporalite uses port 7335
>
> "msg":"Failed to start ringpop listener","error":"listen tcp 127.0.0.1:7335: bind: address already in use" The figma
> agent on mac is using the same port !!!

# Turborepo

https://github.com/Enricopv/turbo-boilerplate/
