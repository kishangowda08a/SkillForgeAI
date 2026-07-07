# Use official Node.js image
FROM node:22

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Tell Docker which port the app uses
EXPOSE 5000

# Start the server
CMD ["npm", "start"]