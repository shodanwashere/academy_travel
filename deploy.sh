#!/bin/bash
docker build -t travelr-backend:latest .
docker login harbor.cfappsecurity.com
docker tag travelr-backend:latest harbor.cfappsecurity.com/travelr/travelr-backend:latest
docker push harbor.cfappsecurity.com/travelr/travelr-backend:latest
terraform init
terraform destroy -auto-approve
terraform apply -auto-approve
