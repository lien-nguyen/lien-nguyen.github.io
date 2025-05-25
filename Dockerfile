FROM node:23-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy the rest of the application code
COPY . .

# Make script executable (if needed)
RUN chmod +x ./src/script.js

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "deployment", "-l", "3000"]