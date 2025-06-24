FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx tsc
EXPOSE 3000
CMD ["npx", "tsx", "script.ts"]

