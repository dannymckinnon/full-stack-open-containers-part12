FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

# ENV PORT=value1 \
#     MONGO_URL=value2 \
#     REDIS_URL=value3

USER node
CMD npm start