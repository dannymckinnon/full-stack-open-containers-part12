FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

# ENV ENV_VAR1=value1 \
#     ENV_VAR2=value2 \
#     ENV_VAR3=value3

USER node
CMD npm start