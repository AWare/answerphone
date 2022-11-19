## BUILD

FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

## Run

FROM node:18

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod

COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 3030
CMD yarn start
