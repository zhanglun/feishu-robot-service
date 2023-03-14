#! /usr/bin/env bash
if which nvm >/dev/null 2>&1; then
  echo "nvm exists"
  nvm use 14
else
  echo "nvm not exists"
  # exit;
fi

pnpm install
pnpm build
rm -rf ./output
mkdir ./output

cp package.json tsconfig.json ./output/
cp -r ./dist ./output/dist/
cp -r ./node_modules ./output/node_modules/

tar -zcvf output.tar.gz output/*