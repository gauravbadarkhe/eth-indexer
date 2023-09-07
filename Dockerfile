FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm install pm2 -g
COPY . .
ENV MONGO="mongodb+srv://doadmin:91KENO06M8uo253Z@db-mongodb-blr1-72536-e69cb240.mongo.ondigitalocean.com/?retryWrites=true&w=majority"
EXPOSE 3001
ENV PM2_PUBLIC_KEY zc91lskxtqottgk
ENV PM2_SECRET_KEY 2ydq915kaapqwf7

CMD ["pm2-runtime", "app.js"]
# CMD ["node", "app.js"]
