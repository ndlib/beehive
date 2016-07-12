#!/bin/bash
# Usage: deploy-pprd {branchname}
# Ex: deploy-pprd v4.0.02
BRANCH=$1

DIR="./public"
SITE="collections-pprd"

BUCKET=${SITE}.library.nd.edu

git checkout ${BRANCH}

npm run build-pprd

aws s3 sync ${DIR} s3://${BUCKET} --exclude '.*' --exclude '*.md' --delete --acl public-read

echo ${BUCKET}.s3-website-us-east-1.amazonaws.com
