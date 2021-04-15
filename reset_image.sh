#/bin/bash

docker rm `docker ps -a -q` -f
docker rmi $(docker images -q)
docker network prune -f
docker volume prune -f
