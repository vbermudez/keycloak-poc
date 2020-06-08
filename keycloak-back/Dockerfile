FROM vbermudez/base-jdk8-maven-alpine:latest

RUN mkdir /tmp/keycloak-back
RUN mkdir /tmp/keycloak-back/src
ADD pom.xml /tmp/keycloak-back
ADD src /tmp/keycloak-back/src

WORKDIR /tmp/keycloak-back
RUN mvn clean package
RUN mv /tmp/keycloak-back/target/keycloak-back-0.0.1-SNAPSHOT.jar /usr/local/lib/keycloak-back.jar
WORKDIR /root

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/usr/local/lib/keycloak-back.jar"]