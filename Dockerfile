FROM node:alpine
WORKDIR /wxmp-server
COPY . ./
RUN npm install --production
EXPOSE 10010
CMD ["npm", "start"]
