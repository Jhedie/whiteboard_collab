## How to run locally

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
