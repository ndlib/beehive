#!/bin/bash
# Usage: deploy-prod {branchname}
# Ex: deploy-prod
BRANCH="v3.1.1"
DIR="./public"
SITE="collections"

BUCKET=${SITE}.library.nd.edu
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`

git checkout master
git pull
git fetch --tags

git checkout ${BRANCH}

npm run build

aws s3 sync ${DIR} s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read

echo ${BUCKET}.s3-website-us-east-1.amazonaws.com

git checkout ${CURRENT_BRANCH}
