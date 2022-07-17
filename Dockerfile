FROM node:16.14.2-alpine

WORKDIR /usr/src/app

RUN corepack enable
RUN corepack prepare pnpm@7.5.2 --activate

COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./.npmrc .

RUN pnpm install

COPY . .

RUN pnpm dlx prisma generate

USER node

CMD [ "pnpm", "start:dev" ]
