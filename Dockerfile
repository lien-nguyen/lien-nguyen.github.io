FROM node:23-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./src/script.js ./

# TODO: Copy the languages files
#COPY ./languages/* ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start", "deployment", "-p", "3000"]