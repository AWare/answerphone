## BUILD

FROM node:15-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

## Run

FROM node:15-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod

COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 8080
CMD yarn start