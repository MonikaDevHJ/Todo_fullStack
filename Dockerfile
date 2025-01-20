# Dockerfile for Node.js backend
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
