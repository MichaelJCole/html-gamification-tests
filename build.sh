#!/bin/bash

# Build SPA
quasar build

# Copy to github pages /docs folder
cp -rf dist docs

echo "Git commit and push for github pages"
