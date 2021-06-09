# Beehive - Digital Exhibits and Collections frontend display


[![Build Status](https://travis-ci.org/ndlib/beehive.svg?branch=master)](https://travis-ci.org/ndlib/beehive)
[![Coverage Status](https://img.shields.io/coveralls/ndlib/beehive.svg)](https://coveralls.io/r/ndlib/beehive?branch=master)
[![Code Climate](https://codeclimate.com/github/ndlib/beehive/badges/gpa.svg)](https://codeclimate.com/github/ndlib/beehive)

Beehive provides an attractive frontend display for the collections and exhibits created and managed by [Honeycomb](https://github.com/ndlib/honeycomb).
It is created and managed by WSE at Hesburgh Libraries.

## Installation

1. `yarn install`

## Running a Development Server

1. `yarn start`

## Deployment

### UA/Prep

* `aws-vault exec libnd ./deploy-prep.sh`

### Production

* `aws-vault exec libnd ./deploy-prod.sh`

### Building for a different stage

By default `npm run build` will use the URL of `https://collections.library.nd.edu` and honeycomb endpoint of `https://honeycomb.library.nd.edu`. You can override these values with the PUBLIC_URL and HONEYCOMB_URL environment variables, ex:

```sh
PUBLIC_URL=https://collections-test.library.nd.edu \
HONEYCOMB_URL=https://honeycomb-test.library.nd.edu \
  npm run build
```
