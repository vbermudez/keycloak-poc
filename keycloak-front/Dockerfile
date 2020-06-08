FROM vbermudez/base-nodejs-angular-slim

RUN mkdir /root/keycloak-front
ADD . /root/keycloak-front

WORKDIR /root/keycloak-front
RUN npm i > /dev/null

EXPOSE 4200
ENTRYPOINT ["ng", "serve"]