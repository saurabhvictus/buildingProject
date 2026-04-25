FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# IMPORTANT: ensure Next.js build runs properly
RUN npm run build

EXPOSE 3000

# safer production start
CMD ["npm", "run", "start"]