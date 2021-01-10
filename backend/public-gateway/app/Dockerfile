FROM node:14-alpine as builder

ADD . /app
RUN cd /app/backend/public-gateway/app \
    && yarn install --silent --no-progress \
    && yarn run build \
    && yarn install --prod --silent --no-progress

FROM node:14-alpine

COPY --from=builder /app/backend/public-gateway/app/dist /app/backend/public-gateway/app/dist
COPY --from=builder /app/backend/public-gateway/app/package.json /app/backend/public-gateway/app
COPY --from=builder /app/backend/public-gateway/app/node_modules /app/backend/public-gateway/app/node_modules
COPY --from=builder /app/node_modules /app/node_modules

WORKDIR /app/backend/public-gateway/app

ENV NODE_ENV production

CMD ["yarn", "run", "start"]
