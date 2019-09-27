FROM node:8.11.4-alpine

WORKDIR /app

RUN apk add --no-cache curl \
        openssl \
        # for node-sass module
        make \
        gcc \
        g++ \
        python \
        py-pip 

COPY . /app/

RUN yarn install

CMD ["yarn", "start"]
