## How to run locally

create a copy of the env.example and rename it to `.env` set the values. This is for the dynamodb

## Backend

must be in the aws-backend directory

`docker build -t whiteboard-aws-backend .`

## Frontend

must be in the Frontend directory

`docker build -t whiteboard-frontend . `

## Etcd

doesnt matter where you run this

pulled from: https://hub.docker.com/r/bitnami/etcd

`docker pull bitnami/etcd`

## Run

must be in the main directory

`docker-compose up -d`

## References

https://github.com/microsoft/etcd3
