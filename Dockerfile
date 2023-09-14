# Use a imagem oficial do Node.js como base
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install express mongoose dotenv swagger-ui-express
COPY . .
# Change the number below in case a different 
EXPOSE 3000
CMD ["node", "index.js"]
