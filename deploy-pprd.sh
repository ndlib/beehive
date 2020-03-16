#!/bin/bash
BUCKET=collections-pprd.library.nd.edu
BRANCH=`git rev-parse --abbrev-ref HEAD`
REVISION=`git rev-parse HEAD`

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}Building preproduction on branch ${BRANCH}${NC}"
npm run build-pprd
echo ${REVISION} > public/REVISION

aws s3 sync ./public s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read
echo -e "${GREEN}Deployed to ${BUCKET}.s3-website-us-east-1.amazonaws.com.${NC}"
