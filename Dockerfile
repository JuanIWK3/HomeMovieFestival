FROM node:16.13.1
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
