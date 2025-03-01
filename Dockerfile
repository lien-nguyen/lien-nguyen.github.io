FROM node:23-alpine

# Set the working directory
WORKDIR /usr/src/app

# TODO: Copy the languages files
#COPY ./languages/* ./

# Copy the rest of the application files
COPY . .

# Build the project
#RUN chmod +x ./src/script.js
#RUN npm run build

# Expose the port the app runs on
#EXPOSE 3000

# Command to run the application
#CMD ["npm", "start", "deployment", "-p", "3000"]