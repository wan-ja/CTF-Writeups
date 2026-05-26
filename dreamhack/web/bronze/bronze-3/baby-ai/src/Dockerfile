FROM node:20-alpine
SHELL ["/bin/ash", "-c"]
RUN apk add --no-cache git cmake clang libgomp libstdc++ curl build-base && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY ./flag.txt /flag.txt
COPY ./src /app

RUN npm ci && \
    npm prune && \
    curl -sf https://gobinaries.com/tj/node-prune | PREFIX=. sh && \
    ./node-prune /app/node_modules && \
    rm -rf ./node-prune && \
    rm -rf /usr/local/include /usr/local/lib && \
    rm -rf /root/.npm && \
    rm -rf /opt/yarn*

RUN apk del git cmake clang curl build-base && \
    rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

EXPOSE 3000

CMD ["node", "index.js"]
