# Snippets
This file contains snippets for you to copy paste

## Start Redis Commander
Make sure you have installed it with `npm install -g redis-commander` then run `redis-commander --redis-port=7379`.

## Start MongoDB in Docker
Run `docker pull mongo` when doing it the first time followed by `docker run --name mongodb -p 37017:27017 -d mongo`.

## Start Redis in Docker
Run `docker pull redis` followed by `docker run --name redis -p 7379:6379 -d redis`

## Start Jaeger in Docker
```sh
docker run --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -d jaegertracing/all-in-one:1.45
```

# Start RabbitMQ Management Interface
http://localhost:15672/ user: guest, password: guest

## Cloning the Exercise Files from GitHub
Please note, that your repository url is different if you decided to fork the repo.
In this case, please use the URL as shown under the <> Code button on the forked repository page.

```bash
git clone --bare https://github.com/LinkedInLearning/nodejs-microservices-4403064.git .git
git config --bool core.bare false
git reset --hard
git branch
```