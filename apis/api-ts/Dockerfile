# Node-Image
FROM node:22-alpine
LABEL authors="niklasgeldbach"

# Arbeitsverzeichnis im Container
WORKDIR /app

# Package Datein kopieren
COPY package.json ./

# Dependencies installieren
RUN npm install

# Rest des Codes kopieren (src/ usw.)
COPY . .

# App bauen
RUN npm run build

# App Starten mit Start Script
CMD ["npm", "start"]
