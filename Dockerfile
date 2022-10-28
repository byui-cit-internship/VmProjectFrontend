# build environment
FROM node:16.15.0 as build
WORKDIR /app
ENV PATH /app/vima-react/node_modules/.bin:$PATH
COPY package.json /app/vima-react/
COPY package-lock.json /app/vima-react/
RUN npm i
RUN npm install react-scripts@3.4.1 -g
COPY . ./
RUN npm run build --prefix /app/vima-react

# production environment
FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build /app/vima-react/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
