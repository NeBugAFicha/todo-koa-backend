FROM node:16.19.0
ADD src /app/
WORKDIR app/

RUN npm install
RUN npx prisma generate
RUN npm run build

ENTRYPOINT npm start