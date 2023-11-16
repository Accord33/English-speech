FROM node:latest
RUN mkdir /app
COPY ./ /app
WORKDIR /app/Samples/Resources/TypeScript/Demo
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 9090
