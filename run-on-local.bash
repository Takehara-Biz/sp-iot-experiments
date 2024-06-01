#!/bin/bash

tsc ./public/*.ts
tsc ./public/**/*.ts
npx ts-node src/index.ts