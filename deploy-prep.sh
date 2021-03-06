#!/bin/bash
BUCKET=collections-prep.library.nd.edu
BRANCH=`git rev-parse --abbrev-ref HEAD`
REVISION=`git rev-parse HEAD`

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}Building preproduction on branch ${BRANCH}${NC}"
npm run build-prep
echo ${REVISION} > build/REVISION

aws s3 sync ./build s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read
echo -e "${GREEN}Deployed to ${BUCKET}.s3-website-us-east-1.amazonaws.com.${NC}"
