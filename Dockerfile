FROM node:latest
RUN mkdir /app
COPY ./ /app
WORKDIR /app/Samples/TypeScript/Demo
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve"]
EXPOSE 9090
