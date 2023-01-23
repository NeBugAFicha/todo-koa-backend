FROM node:18.13.0-alpine


WORKDIR src
COPY ./src/ /src/

RUN npm ci \
        && npx prisma generate \
        && npm run build  

ENTRYPOINT npm start