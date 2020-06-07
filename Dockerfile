FROM node:latest

COPY . /apps/reactor-api

WORKDIR /apps/reactor-api

RUN npm install --production

EXPOSE 1570

CMD ["/cmd.sh"]