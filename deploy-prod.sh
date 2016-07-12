#!/bin/bash
# Usage: deploy-prod {branchname}
# Ex: deploy-prod v4.0.02
BRANCH=$1

DIR="./public"
SITE="collections"

BUCKET=${SITE}.library.nd.edu

git checkout ${BRANCH}

npm run build-prod

aws s3 sync ${DIR} s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read

echo ${BUCKET}.s3-website-us-east-1.amazonaws.com
