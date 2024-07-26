#!/bin/bash
tag=$1
docker build -f Dockerfile -t "ghcr.io/${tag}:latest" .
docker push "ghcr.io/${tag}:latest"
