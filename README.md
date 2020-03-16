# Beehive - Digital Exhibits and Collections frontend display


[![Build Status](https://travis-ci.org/ndlib/beehive.svg?branch=master)](https://travis-ci.org/ndlib/beehive)
[![Coverage Status](https://img.shields.io/coveralls/ndlib/beehive.svg)](https://coveralls.io/r/ndlib/beehive?branch=master)
[![Code Climate](https://codeclimate.com/github/ndlib/beehive/badges/gpa.svg)](https://codeclimate.com/github/ndlib/beehive)

Beehive provides an attractive frontend display for the collections and exhibits created and managed by [Honeycomb](https://github.com/ndlib/honeycomb).
It is created and managed by WSE at Hesburgh Libraries.

### Installation ###
1. `yarn install`

### Usage ###
1. `yarn start`

### Deployment - UA/Prep ###
* `aws-vault exec libnd ./deploy-pprd.sh`

### Deployment - Production ###
* `aws-vault exec libnd ./deploy-prod.sh`