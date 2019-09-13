#!/bin/bash

# Build SPA
quasar build

# Copy to github pages /docs folder
rm -rf docs
cp -rf dist/spa docs

echo "Git commit and push for github pages"
