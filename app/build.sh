#!/bin/bash

npm run build
rm -rf build/images
ln -s ../public/images ./build/images

