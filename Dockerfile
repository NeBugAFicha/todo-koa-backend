FROM node:18.13.0 

COPY src src
WORKDIR src

RUN npm ci
RUN npx prisma generate
RUN npm run build

ENTRYPOINT npm start