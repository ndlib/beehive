#!/bin/bash
# Usage: aws_sync directory sitename
# Ex: aws-s3-sync public collections-pprd
BRANCH=$1

DIR="./public"
SITE="collections"

BUCKET=${SITE}.library.nd.edu

git checkout ${BRANCH}

npm run build-prod

aws s3 sync ${DIR} s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read

echo ${BUCKET}.s3-website-us-east-1.amazonaws.com
