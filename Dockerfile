FROM gradle:jdk as builder
COPY --chown=gradle:gradle . /home/gradle/process-dashboard
WORKDIR /home/gradle/process-dashboard
RUN gradle build

FROM openjdk:8-jre-alpine
LABEL maintainer="basys-support@dfki.de"
ARG VERSION=0.0.1-SNAPSHOT
EXPOSE 8000
COPY --from=builder /home/gradle/process-dashboard/build/libs/process-dashboard-${VERSION}.jar /app/process-dashboard.jar
WORKDIR /app
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./process-dashboard.jar"]