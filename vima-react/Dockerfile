FROM node AS build
WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

CMD npm run start
FROM nginx AS runtime
COPY --from=build /app/build /usr/share/nginx/html/