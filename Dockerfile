FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3030
CMD [ "serve", "-s", "dist" ]