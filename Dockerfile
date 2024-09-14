FROM node:18.14.2
WORKDIR /lifeeasy-chat-server
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3002
CMD ["npm", "start"]