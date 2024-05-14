FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# npm start is the command to start the application in development mode
CMD ["npm", "run", "serve", "--", "--host"]