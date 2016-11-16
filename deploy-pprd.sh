#!/bin/bash
BUCKET=collections-pprd.library.nd.edu
BRANCH=`git rev-parse --abbrev-ref HEAD`
REVISION=`git rev-parse HEAD`

echo "\033[0;31mBuilding preproduction on branch ${BRANCH}\033[0m"
npm run build-pprd
echo ${REVISION} > public/REVISION

aws s3 sync ./public s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read
echo "\033[0;31mDeployed to ${BUCKET}.s3-website-us-east-1.amazonaws.com. Rebuilding for development.\033[0m"
npm run build-dev
