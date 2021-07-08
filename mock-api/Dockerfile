FROM mhart/alpine-node:11.12
RUN apk update
RUN apk upgrade
RUN apk add bash git
WORKDIR /app/api

COPY ./package.json /app/api/package.json
COPY ./package-lock.json /app/api/package-lock.json
COPY ./src /app/api
RUN npm ci

ENTRYPOINT ["npm", "run", "serve"]
