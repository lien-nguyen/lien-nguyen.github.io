FROM node:23-alpine

# Set the working directory
WORKDIR /usr/src/app

# Remove or comment out these lines if package.json is not needed
 COPY package.json ./
 RUN npm install

# Install 'serve' to serve static files
RUN npm install -g serve

RUN npm install || cat /root/.npm/_logs/*

# Copy the rest of the application code
COPY . .

# Make script executable (if needed)
RUN chmod +x ./src/script.js

# Build the project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "deployment", "-l", "3000"]