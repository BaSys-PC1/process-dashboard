# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

LABEL maintainer="staudtphil@aol.com"

VOLUME /tmp

EXPOSE 8000

ARG JAR_FILE=build/libs/process.webgui-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} process.webgui.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/process.webgui.jar"]