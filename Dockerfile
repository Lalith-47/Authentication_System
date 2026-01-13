FROM node:20-alpine

WORKDIR /backend

COPY package.json package-lock.json /backend/

RUN npm install

COPY src/ /backend/src/

EXPOSE 3000

CMD ["npm", "run", "start"]
