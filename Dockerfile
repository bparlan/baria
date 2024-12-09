# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Remove the default Nginx webpage
RUN rm -rf /usr/share/nginx/html/*

# Copy the contents of your project to the container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]