# spike-orchestration-temporal

Orchestration with temporal.io, focus on project structure and testability

# Dev dependencies

## open issues

- [ ] configure linting and use
      [temporal specific linting](https://github.com/temporalio/samples-typescript/blob/main/.shared/.eslintrc.js)

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

## Turborepo

Turborepo is used a our build and mono-repo tool, it has some advanced features and is backed by Vercel.

Links: https://github.com/Enricopv/turbo-boilerplate/


## XState 

XState is a fine statemachine implementation in Typescript and allows fine control of the flow.


Links:
* https://www.youtube.com/watch?v=GuzcWkVrqLg



## To investigate

https://github.com/laconiajs/laconia http://howto.philippkeller.com/2005/04/24/Tags-Database-schemas/
